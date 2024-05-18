import { Table } from "react-bootstrap";
import { GetIssueResponse } from "../../api/IssueApi";

export default function IssuesTable(
    stateResponse: GetIssueResponse[], setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Id читателя</th>
                    <th>Дата возврата</th>
                    <th>Id книг</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetIssueResponse) =>
                    <tr key={item.id} onClick={() => {(
                            setShowUpdateModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.readerId}</td>
                        <td>{item.returnDate}</td>
                        <td>{item.booksId}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}