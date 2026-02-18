// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   styled,
//   TableRow,
//   TableHead,
//   TableContainer,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
// } from "@mui/material";
// import axiosInstance from "../common/AxiosInstance";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const AdminHome = () => {
//   const [allUsers, setAllUsers] = useState([]);

//   const allUsersList = async () => {
//     try {
//       const res = await axiosInstance.get("api/admin/getallusers", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (res.data.success) {
//         setAllUsers(res.data.data);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     allUsersList();
//   }, []);

//   const deleteUser = async (userId) => {
//     const confirmation = confirm("Are you sure you want to delete");
//     if (!confirmation) {
//       return;
//     }
//     try {
//       const res = await axiosInstance.delete(`api/user/deleteuser/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (res.data.success) {
//         alert(res.data.message);
//         allUsersList();
//       } else {
//         alert("Failed to delete the user");
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>User ID</StyledTableCell>
//             <StyledTableCell align="left">User Name</StyledTableCell>
//             <StyledTableCell align="left">Email</StyledTableCell>
//             <StyledTableCell align="left">Type</StyledTableCell>
//             <StyledTableCell align="left">Action</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {allUsers.length > 0 ? (
//             allUsers.map((user) => (
//               <StyledTableRow key={user._id}>
//                 <StyledTableCell component="th" scope="row">
//                   {user._id}
//                 </StyledTableCell>
//                 <StyledTableCell component="th" scope="row">
//                   {user.name}
//                 </StyledTableCell>
//                 <StyledTableCell component="th" scope="row">
//                   {user.email}
//                 </StyledTableCell>
//                 <StyledTableCell component="th" scope="row">
//                   {user.type}
//                 </StyledTableCell>
//                 <StyledTableCell component="th" scope="row">
//                   <Button
//                     onClick={() => deleteUser(user._id)}
//                     size="small"
//                     color="error"
//                   >
//                     Delete
//                   </Button>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))
//           ) : (
//             <p className="px-2">No users found</p>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AdminHome;

// src/components/admin/AdminHome.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const AdminHome = () => {
  return (
    <Box p={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Welcome, Admin
      </Typography>
      <Typography variant="body1" mb={4}>
        Choose an action to manage the platform:
      </Typography>
      <Box display="flex" justifyContent="center" gap={4}>
        <Link to="/admin/all-users">
          <Button variant="contained" color="primary">
            View All Users
          </Button>
        </Link>
        <Link to="/admin/all-courses">
          <Button variant="contained" color="secondary">
            View All Courses
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AdminHome;
