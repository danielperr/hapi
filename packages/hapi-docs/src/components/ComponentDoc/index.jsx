import React from 'react';

function ComponentDoc({ docs }) {
  return (
    <div>
      <h1>{docs.displayName}</h1>
      <p>{docs.description}</p>
      <h2>Props</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Is Required</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(docs.props || {}).map(([name, { description, required, type }], index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{description}</td>
              <td>{required ? 'Yes' : 'No'}</td>
              <td>{JSON.stringify(type)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <hr />
      <br />
    </div>
  );
}

export default ComponentDoc;
