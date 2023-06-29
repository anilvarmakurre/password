import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import Search from './Component/Search'

import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    isShowen: false,
    website: '',
    username: '',
    password: '',
    initialPasswordList: [],
  }

  ontoggle = () => {
    this.setState(prevState => ({
      isShowen: !prevState.isShowen,
    }))
  }

  updateWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPasswordList = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newPasswordList = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      initialPasswordList: [...prevState.initialPasswordList, newPasswordList],
      website: '',
      username: '',
      password: '',
    }))
  }

  updateSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUpdate = id => {
    const {initialPasswordList} = this.state

    this.setState({
      initialPasswordList: initialPasswordList.filter(each => each.id !== id),
    })
  }

  getSearchResults = () => {
    const {searchInput, initialPasswordList} = this.state
    const searchResults = initialPasswordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  getNoPassword = () => {
    console.log('hello')
    return (
      <div className="no-password-container">
        <img
          className="no-password"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p className="no-para">No Passwords</p>
      </div>
    )
  }

  getPasswordList = searchResults => {
    const {isShowen} = this.state
    console.log('good')
    return (
      <ul className="password-container">
        {searchResults.map(each => (
          <Search
            passwordList={each}
            key={each.id}
            isShowen={isShowen}
            deleteUpdate={this.deleteUpdate}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      searchInput,
      username,
      password,
      website,
      initialPasswordList,
    } = this.state

    const searchResults = this.getSearchResults()

    const count = initialPasswordList.length

    return (
      <div className="bg-container">
        <img
          className="top-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-container">
          <div className="top-left">
            <h1 className="title">Add New Password</h1>
            <form
              className="top-left-password"
              onSubmit={this.onAddPasswordList}
            >
              <div className="top-password-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  className="user-input"
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.updateWebsite}
                />
              </div>
              <div className="top-password-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  className="user-input"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.updateUserName}
                />
              </div>
              <div className="top-password-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  className="user-input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.updatePassword}
                />
              </div>
              <div className="button-container">
                <button className="input-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="top-right">
            <img
              className="top-right-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-container-top">
            <h1 className="password-text">
              Your Passwords <span className="count">{count}</span>
            </h1>
            <div className="search-container">
              <button className="search-button" type="button">
                <img
                  className="search-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </button>
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.updateSearch}
              />
            </div>
          </div>
          <hr className="hr-elements" />
          <div className="bottom-box-container">
            <div className="show-password">
              <input
                className="check-input"
                type="checkbox"
                id="showPassword"
                onClick={this.ontoggle}
              />
              <label className="check-label" htmlFor="showPassword">
                Show Passwords
              </label>
            </div>
            <div className="bottom-hide-box">
              {count > 0
                ? this.getPasswordList(searchResults)
                : this.getNoPassword()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
