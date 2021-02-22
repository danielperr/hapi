import React from 'react';

import styles from './styles.module.css';

function getPropTypeClassName(type) {
  switch (type) {
    case 'number':
      return styles.propTypeNumber;
    case 'bool':
      return styles.propTypeBoolean;
    case 'string':
      return styles.propTypeString;
    default:
      return styles.propTypeOther;
  }
}

function getNodeFromPropType(type) {
  switch (type.name) {
    case 'custom':
      return type.raw;
    case 'number':
    case 'bool':
    case 'string':
    case 'func':
    case 'node':
    case 'object':
      return <span className={getPropTypeClassName(type.name)}>{type.name}</span>;
    default:
      return (
        <>
          <span className={styles.propTypeOther}>{type.name}: </span>
          {JSON.stringify(type.value)}
        </>
      );
  }
}

function ComponentDoc({ docs }) {
  return (
    <div>
      <h1>{docs.displayName}</h1>
      <p>{docs.description}</p>
      <h2>Props</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Description</th>
          </tr>
          {Object.entries(docs.props || {}).map(([propName, prop], index) => (
            <tr key={index}>
              <td>{propName}</td>
              <td>{getNodeFromPropType(prop.type)}</td>
              <td>
                {prop.required
                  ? <span className={styles.propRequired}>Required</span>
                  : <span className={getPropTypeClassName(prop.type.name)}>{prop.defaultValue?.value}</span>}
              </td>
              <td>{prop.description}</td>
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
