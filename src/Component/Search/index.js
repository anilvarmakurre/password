import './index.css'

const Search = props => {
  const {isShowen, passwordList, deleteUpdate} = props
  const {id, website, username, password} = passwordList

  console.log(website, username, password, isShowen)

  const deleteList = () => {
    deleteUpdate(id)
  }

  const star = (
    <img
      className="star"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  console.log(star, password)

  const isShowenPassword = isShowen ? password : star

  return (
    <li className="password-box">
      <div className="password-box-left">
        <p className="dp-para">{website[0]}</p>
      </div>
      <div className="password-box-center">
        <p className="para">{website}</p>
        <p className="para">{username}</p>
        <p className="para">{isShowenPassword}</p>
      </div>
      <div className="password-box-right">
        <button
          className="delete-button"
          type="button"
          value={id}
          onClick={deleteList}
          data-testid="delete"
        >
          <img
            className="delete-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default Search
