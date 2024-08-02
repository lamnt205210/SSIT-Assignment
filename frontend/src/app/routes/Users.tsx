import React, { useState, useEffect } from "react";
import DataGrid from "../../components/DataTable";
import { User } from "../../types/api";
import getUsers from "../../features/users/api/get-users";
import Button from "../../components/Button";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsers(page, 10).then((users) => {
      setUsers(users);
      console.log(users);
    });
  }, [page]);

  const columns = [
    { field: "id", headerName: "ID", sortable: true },
    { field: "fullname", headerName: "Full Name", sortable: true },
    { field: "username", headerName: "Username", sortable: true },
    { field: "thumbnail", headerName: "Thumbnail", sortable: false },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    fullname: `${user.name.first} ${user.name.last}`,
    username: user.login.username,
    thumbnail: user.picture.thumbnail,
  }));

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    } else {
      setPage(1);
    }
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <DataGrid columns={columns} rows={rows} />
      <div className="my-4 flex justify-center items-center">
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <span className="mx-2">{page}</span>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default App;
