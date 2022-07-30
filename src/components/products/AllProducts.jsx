import React, { useEffect, useState, useMemo } from "react";
import { HTTP } from "../../HTTP";
import ReactPaginate from "react-paginate";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import { Space, Spin } from "antd";
import { Modal, Button } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";

function AllProducts() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "User Id",
        accessor: "userId",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Body",
        accessor: "body",
      },
      {
        Header: "Actions",
        id: "action",
        accessor: (str) => "action",

        Cell: (tableProps) => (
          <div className="d-flex justify-content-between px-1">
            <Button
              variant="danger"
              className="me-2"
              onClick={() => {
                handleDeletePost(tableProps.row.values.id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setUpdateData({
                  id: tableProps.row.values.id,
                  userId: tableProps.row.values.userId,
                  title: tableProps.row.values.title,
                  body: tableProps.row.values.body,
                });
                setUpdateModalShow(true);
              }}
            >
              Update
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  const tableInstace = useTable({
    columns,
    data: items,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstace;

  const handlePaginate = (data) => {
    setCurrentPage(data.selected + 1);
    getData(limit, data.selected + 1);
  };
  const handleUpdateClose = () => setUpdateModalShow(false);
  const handleAddClose = () => setAddModalShow(false);
  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        HTTP.delete(`posts/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: '"Deleted!", "Your file has been deleted.", "success"',
              showConfirmButton: false,
              timer: 1500,
            });
            getData();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.message}`,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          });
      }
    });
  };
  const getData = async (limit = 5, currentPage = 1) => {
    try {
      setLoading(true);
      await HTTP.get(`posts?_limit=${limit}&_page=${currentPage}`).then(
        (response) => {
          console.log(response.data);
          setItems(response.data);
          // setPageCount(Math.ceil(response.data.length / limit));
          setLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateModal = (props) => {
    return (
      <Modal {...props} size="lg" aria-labelledby="update-modal-title" centered>
        <Modal.Header closeButton>
          <Modal.Title id="update-modal-title">Modal heading</Modal.Title>
        </Modal.Header>
        <UpdateForm
          updateData={updateData}
          getData={getData}
          currentPage={currentPage}
          limit={limit}
          handleUpdateClose={handleUpdateClose}
          {...props}
        />
      </Modal>
    );
  };
  const AddModal = (props) => {
    return (
      <Modal {...props} size="lg" aria-labelledby="add-modal-title" centered>
        <Modal.Header closeButton>
          <Modal.Title id="add-modal-title">Add new Post</Modal.Title>
        </Modal.Header>
        <AddForm
          handleAddClose={handleAddClose}
          currentPage={currentPage}
          limit={limit}
          getData={getData}
          {...props}
        />
      </Modal>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mb-3 d-flex justify-content-end px-md-5">
        <Button variant="success" onClick={() => setAddModalShow(true)}>
          Add Post
        </Button>{" "}
      </div>
        {!loading ? (
          <>
            <Table
              striped
              bordered
              hover
              size="sm"
              responsive
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className='tb-header'>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <div className="tb d-flex justify-content-center align-items-center">
            <Space size="large">
            <Spin size="large" />
          </Space>
          </div>
        )}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePaginate}
        containerClassName={"pagination justify-content-center "}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <UpdateModal show={updateModalShow} onHide={handleUpdateClose} />
      <AddModal show={addModalShow} onHide={handleAddClose} />
    </>
  );
}

export default AllProducts;