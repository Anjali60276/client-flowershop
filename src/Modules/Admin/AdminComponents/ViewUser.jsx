import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ViewUser() {
  const { host } = useContext(UserContext);
  const [alluser, setAllusers] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await axios.get(`${host}/api/user/Getuser`);
        setAllusers(response.data.getusers || []);   
        console.log("All user", response.data.getusers);
      } catch (error) {
        console.error(error);
      }
      console.log(host);
    };
    fetchusers();
  }, [host]);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f9c5d1 0%, #f7a8c4 100%)', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Box sx={{ 
        padding: "20px",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: "bold",
            color: '#e75480',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
           User Management 
        </Typography>
        <TableContainer 
          component={Paper} 
          elevation={3}
          sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid #ffb6c1'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: '#ffb6c1',
                background: 'linear-gradient(135deg, #ffb6c1 0%, #ff99ac 100%)'
              }}>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    fontSize: '16px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  S.No
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    fontSize: '16px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Name
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    fontSize: '16px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Email
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    fontSize: '16px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Address
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    fontSize: '16px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alluser.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={5} 
                    align="center"
                    sx={{ 
                      backgroundColor: '#fff5f7',
                      padding: '40px',
                      fontStyle: 'italic',
                      color: '#e75480'
                    }}
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                alluser.map((userdata, index) => (
                  <TableRow 
                    key={userdata._id ?? index} 
                    hover
                    sx={{ 
                      '&:nth-of-type(even)': {
                        backgroundColor: '#fff5f7',
                      },
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#ffffff',
                      },
                      '&:hover': {
                        backgroundColor: '#ffe4e9',
                        transform: 'scale(1.002)',
                        transition: 'all 0.2s ease'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <TableCell 
                      align="center"
                      sx={{ 
                        borderRight: '1px solid #ffd1dc',
                        color: '#555',
                        fontWeight: '500'
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        borderRight: '1px solid #ffd1dc',
                        color: '#555',
                        fontWeight: '500'
                      }}
                    >
                      {userdata.name ?? userdata.uname ?? "—"}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        borderRight: '1px solid #ffd1dc',
                        color: '#555',
                        fontWeight: '500'
                      }}
                    >
                      {userdata.email ?? userdata.uemail ?? "—"}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        borderRight: '1px solid #ffd1dc',
                        color: '#555',
                        fontWeight: '500'
                      }}
                    >
                      {userdata.address ?? userdata.uaddress ?? userdata.userAddress ?? "—"}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        color: '#555',
                        fontWeight: '500'
                      }}
                    >
                      {/* 🎯 FIXED: Prioritize 'phone' which is the actual field name in UserModel.js */}
                      {userdata.phone || userdata.uphoneno || userdata.uphone || userdata.contact || "—"} 
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}