import React, { useState, useEffect } from "react";
import {
  Button,
  styled,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import axiosInstance from "../common/AxiosInstance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/getallusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(
        `/api/admin/deleteuser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        fetchUsers(); // refresh
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell>{user._id}</StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => deleteUser(user._id)}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                No Users Found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
