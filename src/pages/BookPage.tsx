import { useState } from "react";
import { Table } from "react-bootstrap";
import { CreateBookRequest, GetBookResponse } from "../api/BookApi";

export default function BookPage(){
    const [stateResponse, setStateResponse] = useState<GetBookResponse>({
        id: '',
        title: '',
        author: null,
        numberPages: 0,
        yearPublishing: 0,
        cityPublishing: null,
        issueId: null,
        hallNo: null
    });    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateBookRequest>({
        title: '',
        author: null,
        numberPages: 0,
        yearPublishing: 0,
        cityPublishing: null,
        hallNo: null
    });    

    return(
        <Table className="mx-auto" striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    )
}