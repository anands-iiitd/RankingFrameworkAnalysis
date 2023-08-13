import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Institute = () => {
  const { instituteId } = useParams();
  const API1 = `http://127.0.0.1:8000/api/institute/${instituteId}/UG/placement/`;
  const API2 = `http://127.0.0.1:8000/api/institute/${instituteId}/PG/placement/`;
  const API3 = `http://127.0.0.1:8000/api/institute/${instituteId}/UG/students/`;
  const API4 = `http://127.0.0.1:8000/api/institute/${instituteId}/PG/students/`;
  const API5 = `http://127.0.0.1:8000/api/institute/${instituteId}/PHD/students/`;

  const [placementUG, setPlacementUG] = useState([]);
  const [placementPG, setPlacementPG] = useState([]);
  const [studentsUG, setStudentsUG] = useState([]);
  const [studentsPG, setStudentsPG] = useState([]);
  const [studentsPhD, setStudentsPhD] = useState([]);

  useEffect(() => {
    fetch(API1)
      .then((response) => response.json())
      .then((data) => setPlacementUG(data))
      .catch((error) => console.log(error));

    fetch(API2)
      .then((response) => response.json())
      .then((data) => setPlacementPG(data))
      .catch((error) => console.log(error));

    fetch(API3)
      .then((response) => response.json())
      .then((data) => setStudentsUG(data))
      .catch((error) => console.log(error));

    fetch(API4)
      .then((response) => response.json())
      .then((data) => setStudentsPG(data))
      .catch((error) => console.log(error));

    fetch(API5)
      .then((response) => response.json())
      .then((data) => setStudentsPhD(data))
      .catch((error) => console.log(error));
  }, [API1, API2, API3, API4, API5]);

  return (
    <div>
      <h1>Institute Details</h1>
      <p>Institute ID: {instituteId}</p>
      {/* Add additional content or functionality as needed */}
      <h2>Placement UG:</h2>
      <table>
        <thead>
          <tr>
            <th>Acadenic Year</th>
            <th>First Yr Students Intake</th>
            <th>First Yr Students admitted</th>
            <th>Academic Year.1</th>
            <th>Lateral entry admission</th>
            <th>Academic Year.2</th>
            <th>Students graduating in min time</th>
            <th>Students placed</th>
            <th>Median Salary</th>
            <th>Students selected for higher study</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(placementUG)} */}
        {placementUG.map((item, index) => (
              <tr key={index}>
                <td>{item['Academic Year']}</td>
                <td>{item['No. of first year\rstudents intake in the\ryear']}</td>
                <td>{item['No. of first year\rstudents admitted in\rthe year']}</td>
                <td>{item['Academic Year.1']}</td>
                <td>{item['No. of students\radmitted through\rLateral entry']}</td>
                <td>{item['Academic Year.2']}</td>
                <td>{item['No. of students\rgraduating in\rminimum stipulated\rtime']}</td>
                <td>{item['No. of students\rplaced']}</td>
                <td>{item['Median salary of\rplaced graduates per\rannum(Amount in\rRs.)']}</td>
                <td>{item['No. of students\rselected for Higher\rStudies']}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Placement PG:</h2>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>First Yr Students Intake</th>
            <th>First Yr Students admitted</th>
            <th>Academic Year.1</th>
            {/* <th>Lateral entry admission</th> */}
            <th>Students graduating in min time</th>
            {/* <th>Academic Year.2</th> */}
            <th>Students placed</th>
            <th>Median Salary</th>
            <th>Students selected for higher study</th>
          </tr>
        </thead>
        <tbody>
        {placementPG.map((item, index) => (
              <tr key={index}>
                <td>{item['Academic Year']}</td>
                <td>{item['No. of first year\rstudents intake in the\ryear']}</td>
                <td>{item['No. of first year\rstudents admitted in\rthe year']}</td>
                <td>{item['Academic Year.1']}</td>
                {/* <td>{item['No. of students\radmitted through\rLateral entry']}</td> */}
                {/* <td>{item['Academic Year.2']}</td> */}
                <td>{item['No. of students graduating in minimum\rstipulated time']}</td>
                <td>{item['No. of students\rplaced']}</td>
                <td>{item['Median salary of\rplaced graduates per\rannum(Amount in\rRs.)']}</td>
                <td>{item['No. of students\rselected for Higher\rStudies']}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Students UG:</h2>

      <table>
        <thead>
          <tr>
            <th />
            <th>No. of Male Students</th>
            <th>No. of Female Students</th>
            <th>Total Students</th>
            <th>Within State</th>
            <th>Outside State</th>
            <th>Outside Country</th>
            <th>Economically Backward</th>
            <th>Socially Challenged</th>
            <th>No. of students receiving full tuition fee reimbursement from the State and Central Government</th>
            <th>No. of students receiving full tuition fee reimbursement from Institution Funds</th>
            <th>No. of students receiving full tuition fee reimbursement from the Private Bodies</th>
            <th>No. of students who are not receiving full tuition fee reimbursement</th>
          </tr>
        </thead>
        <tbody>
          {studentsUG.map((item, index) => (
            <tr key={index}>
            {item['UG Four Year'] ? (
              <>
                <td>UG Four Year</td>
                <td>{item['UG Four Year']['No. of Male Students']}</td>
                <td>{item['UG Four Year']['No. of Female Students']}</td>
                <td>{item['UG Four Year']['Total Students']}</td>
                <td>{item['UG Four Year']['Within State (Including male & female)']}</td>
                <td>{item['UG Four Year']['Outside State (Including male & female)']}</td>
                <td>{item['UG Four Year']['Outside Country (Including male & female)']}</td>
                <td>{item['UG Four Year']['Economically Backward (Including male & female)']}</td>
                <td>{item['UG Four Year']['Socially Challenged (SC+ST+OBC Including male & female)']}</td>
                <td>{item['UG Four Year']['No. of students receiving full tuition fee reimbursement from the State and Central Government']}</td>
                <td>{item['UG Four Year']['No. of students receiving full tuition fee reimbursement from Institution Funds']}</td>
                <td>{item['UG Four Year']['No. of students receiving full tuition fee reimbursement from the Private Bodies']}</td>
                <td>{item['UG Four Year']['No. of students who are not receiving full tuition fee reimbursement']}</td>
              </>
            ) : (
              <>
              <td>UG Five Year</td>
                <td>{item['UG Five Year']['No. of Male Students']}</td>
                <td>{item['UG Five Year']['No. of Female Students']}</td>
                <td>{item['UG Five Year']['Total Students']}</td>
                <td>{item['UG Five Year']['Within State (Including male & female)']}</td>
                <td>{item['UG Five Year']['Outside State (Including male & female)']}</td>
                <td>{item['UG Five Year']['Outside Country (Including male & female)']}</td>
                <td>{item['UG Five Year']['Economically Backward (Including male & female)']}</td>
                <td>{item['UG Five Year']['Socially Challenged (SC+ST+OBC Including male & female)']}</td>
                <td>{item['UG Five Year']['No. of students receiving full tuition fee reimbursement from the State and Central Government']}</td>
                <td>{item['UG Five Year']['No. of students receiving full tuition fee reimbursement from Institution Funds']}</td>
                <td>{item['UG Five Year']['No. of students receiving full tuition fee reimbursement from the Private Bodies']}</td>
                <td>{item['UG Five Year']['No. of students who are not receiving full tuition fee reimbursement']}</td>
              </>
            )}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Students PG:</h2>

      <table>
        <thead>
          <tr>
            <th />
            <th>No. of Male Students</th>
            <th>No. of Female Students</th>
            <th>Total Students</th>
            <th>Within State</th>
            <th>Outside State</th>
            <th>Outside Country</th>
            <th>Economically Backward</th>
            <th>Socially Challenged</th>
            <th>No. of students receiving full tuition fee reimbursement from the State and Central Government</th>
            <th>No. of students receiving full tuition fee reimbursement from Institution Funds</th>
            <th>No. of students receiving full tuition fee reimbursement from the Private Bodies</th>
            <th>No. of students who are not receiving full tuition fee reimbursement</th>
          </tr>
        </thead>
        <tbody>
          {studentsPG.map((item, index) => {
            if (!item['PG Two Year'] && !item['PG Three Year']) {
              return null; // Skip the iteration
            }
            return (
              <tr key={index}>
                {item['PG Two Year'] ? (
                  <>
                    <td>PG Two Year</td>
                    <td>{item['PG Two Year']['No. of Male Students']}</td>
                    <td>{item['PG Two Year']['No. of Female Students']}</td>
                    <td>{item['PG Two Year']['Total Students']}</td>
                    <td>{item['PG Two Year']['Within State (Including male & female)']}</td>
                    <td>{item['PG Two Year']['Outside State (Including male & female)']}</td>
                    <td>{item['PG Two Year']['Outside Country (Including male & female)']}</td>
                    <td>{item['PG Two Year']['Economically Backward (Including male & female)']}</td>
                    <td>{item['PG Two Year']['Socially Challenged (SC+ST+OBC Including male & female)']}</td>
                    <td>{item['PG Two Year']['No. of students receiving full tuition fee reimbursement from the State and Central Government']}</td>
                    <td>{item['PG Two Year']['No. of students receiving full tuition fee reimbursement from Institution Funds']}</td>
                    <td>{item['PG Two Year']['No. of students receiving full tuition fee reimbursement from the Private Bodies']}</td>
                    <td>{item['PG Two Year']['No. of students who are not receiving full tuition fee reimbursement']}</td>
                  </>
                ) : item['PG Three Year'] ? (
                  <>
                    <td>PG Three Year</td>
                    <td>{item['PG Three Year']['No. of Male Students']}</td>
                    <td>{item['PG Three Year']['No. of Female Students']}</td>
                    <td>{item['PG Three Year']['Total Students']}</td>
                    <td>{item['PG Three Year']['Within State (Including male & female)']}</td>
                    <td>{item['PG Three Year']['Outside State (Including male & female)']}</td>
                    <td>{item['PG Three Year']['Outside Country (Including male & female)']}</td>
                    <td>{item['PG Three Year']['Economically Backward (Including male & female)']}</td>
                    <td>{item['PG Three Year']['Socially Challenged (SC+ST+OBC Including male & female)']}</td>
                    <td>{item['PG Three Year']['No. of students receiving full tuition fee reimbursement from the State and Central Government']}</td>
                    <td>{item['PG Three Year']['No. of students receiving full tuition fee reimbursement from Institution Funds']}</td>
                    <td>{item['PG Three Year']['No. of students receiving full tuition fee reimbursement from the Private Bodies']}</td>
                    <td>{item['PG Three Year']['No. of students who are not receiving full tuition fee reimbursement']}</td>
                  </>
                ) : null /* Specify the return value when neither category is available */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Students PhD:</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Full Time</th>
            <th>Part Time</th>
          </tr>
        </thead>
        <tbody>
          {studentsPhD.map((item, index) => (
            <tr key={index}>
              {item['PHD Pursuing'] && (
                <>
                  <td>PHD Pursuing</td>
                  <td>{item['PHD Pursuing']['Full Time']}</td>
                  <td>{item['PHD Pursuing']['Part Time']}</td>
                </>
              )}
              {item['PHD Graduated'] && (
                <>
                  <td>PHD Graduated</td>
                  <td>
                    <ul>
                      {Object.entries(item['PHD Graduated']['Full Time']).map(([year, count]) => (
                        <li key={year}>{year}: {count}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {Object.entries(item['PHD Graduated']['Part Time']).map(([year, count]) => (
                        <li key={year}>{year}: {count}</li>
                      ))}
                    </ul>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Institute;
