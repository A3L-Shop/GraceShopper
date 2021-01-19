import React from 'react'

const User = ({id, email, name, isAdmin, handleChange}) => {
  return (
    <tr>
      <td>{email}</td>
      <td>{name}</td>
      <td>
        <input
          type="checkbox"
          name="isAdminState"
          checked={isAdmin}
          onChange={() => handleChange(id)}
        />
      </td>
    </tr>
  )
}

export default User