import React from "react";

export default function Employee({ employees }) {
    return (
        <div>


            <table className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Departments</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>


                    {
                        employees.map((employee, index) => {
                            return <tr key={index}>
                                <td>{index}</td>
                                <td>{employee.name}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department.name}</td>
                                <td >
                                    {/* <Button variant="primary" className="mx-2">Editer</Button>
                                    <Button variant="danger" className="mx-2">Delete</Button> */}
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}
