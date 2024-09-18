import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, removeItems } from "./postSlice";
import {
  Box,
  Button,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PostAdd from "./postAdd";

export default function PostList() {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.items);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const filterItem = items.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {/* <pre>{JSON.stringify(filterItem, null, 1)}</pre> */}
      <h2>DATA POSTS</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              value={search}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={8} justifyContent={"flex-end"}>
            <PostAdd />
          </Grid>
        </Grid>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterItem.map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.title}</TableCell>
                <TableCell>{value.body}</TableCell>
                <TableCell>
                  <div onClick={() => dispatch(removeItems(value.id))}>
                    <DeleteIcon />
                  </div>
                  <EditCalendarIcon />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
