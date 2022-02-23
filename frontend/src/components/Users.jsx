import React from 'react';
// proptypes imported for validation
import PropTypes from 'prop-types';
// useNavigate hook imported
import {useNavigate} from 'react-router-dom';
/**
 * Users component
 * handles both github and gitlab search results to display their profiles
 * custom css used for styling see repo.css
 * @param {*} param0 props object deconstructed
 * @return {*} html for the display of github and gitlab search results
 */
function Users({id, img, name, platform}) {
  // navigate variable declared as the useNavigate hook shorthand
  const navigate = useNavigate();
  /**
   * NavigateController function
   * helper function that redirects the user to the appropriate route
   * @param {*} gitPlatform the platform of the profile
   * @return {*} navigates a user to corresponding route
   */
  const navigateController = (gitPlatform) =>{
    if (gitPlatform === 'github') {
      return navigate(`/github-profile/${name}`);
    }
    return navigate(`/gitlab-profile/${name}`);
  };
  /**
   * user components display
   * img element - uses the img prop as the src url
   * username h4 - uses the name prop as text
   * button has an onClick event that fires the navigateController func
   */
  return (
    <div className='outer-user-container-home'>
      <img src={img} alt='profile-picture' className='profile-picture-home'/>
      <h4 className='user-name-home'>Username: {name}</h4>
      <button
        type='button'
        className='btn btn-primary view-button-home'
        onClick={()=>{
          navigateController(platform);
        }}
      >
      view
      </button>
    </div>
  );
}
// prop type validation
Users.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
};

export default Users;
