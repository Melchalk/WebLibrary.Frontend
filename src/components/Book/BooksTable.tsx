import { Table } from "react-bootstrap";
import { GetBookResponse, UpdateBookRequest } from "../../api/BookApi";

export default function BooksTable(
    stateResponse: GetBookResponse[],
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    setStateUpdateRequest: React.Dispatch<React.SetStateAction<UpdateBookRequest>>){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>NumberPages</th>
                <th>YearPublishing</th>
                <th>CityPublishing</th>
                <th>IssueId</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetBookResponse) =>
                    <tr key={item.id} onClick={() => {(
                            setStateUpdateRequest(item),
                            setShowUpdateModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author != null ? item.author : "Неизвестно"}</td>
                        <td>{item.numberPages}</td>
                        <td>{item.yearPublishing}</td>
                        <td>{item.cityPublishing != null ? item.cityPublishing : "Неизвестно"}</td>
                        <td>{item.issueId != null ? item.issueId : "Находится в библиотеке"}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}