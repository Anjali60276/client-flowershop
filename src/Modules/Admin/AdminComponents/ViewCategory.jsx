import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ViewCategory() {
  const {host} = useContext(UserContext);
  const [allcategory, setAllcategory] = useState([]);

  useEffect(() => {
    fetchcategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await axios.get(`${host}/api/category/Getcategory`);
      setAllcategory(response.data.getcategory || []); // no change to your API shape
      console.log("All category", response.data.getcategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (cid) => {
    console.log("category id " + cid);
    axios
      .delete(`${host}/api/category/Deletecategory/${cid}`)
      .then(() => {
        alert("category deleted");
        fetchcategory(); // refresh after delete
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(host);
  };

  return (
    <div>
      <TableContainer sx={{ mx: 'auto', mt: 2, width: ['95%', '90%', '80%'] }}>
        <Typography variant='h4' sx={{ mb: 3, textAlign: 'center' }}>
          View Category
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#fbc02d' }}>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>Sl.No</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>Category Name</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>Category Description</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allcategory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              allcategory.map((categorydata, index) => (
                <TableRow key={categorydata._id ?? index} sx={{ backgroundColor: '#fffde7' }}>
                  <TableCell>{index + 1}</TableCell>

                  {/* Left align names and allow normal wrapping for descriptions */}
                  <TableCell sx={{ textAlign: 'left', verticalAlign: 'top' }}>
                    {categorydata.category_name}
                  </TableCell>

                  <TableCell
                    sx={{
                      textAlign: 'left',
                      maxWidth: 400,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      verticalAlign: 'top',
                    }}
                  >
                    {categorydata.category_description}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        variant='contained'
                        color='success'
                        size="small"
                        component={Link}
                        to={`/Admin/UpdateCategory/${categorydata._id}`}
                        startIcon={<EditIcon />}
                      >
                        Update
                      </Button>

                      <Button
                        variant='contained'
                        color='error'
                        size="small"
                        onClick={() => handleDelete(categorydata._id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}