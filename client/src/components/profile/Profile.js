import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
// import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner'
import {Link}  from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileByHandle} from '../../actions/profileAction'
import {connect} from 'react-redux'
class Profile extends Component {
  componentDidMount(){ //will check for handle and call getprofilebyhandle then pass the handle in to the url
      if(this.props.match.params.handle){
        this.props.getProfileByHandle(this.props.match.params.handle);
      }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }
  
    render() {
        const { profile, loading} = this.props.profile;

        let profileContent;

        if(profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                    <div>
                    <div className = 'row'>
                    <div className = 'col-md-6'>
                    <Link to ='/profiles' className = "btn btn-dark mb-3 float-left">
                    Back
                    </Link>
                    
                    
                    </div>
                    <div className = "col-md-6" />
                    </div>
                    <ProfileHeader profile = {profile}/>
                    <ProfileAbout profile = {profile}/>
                    <ProfileCreds education = {profile.education} experience = {profile.experience}/>

                {/* {profile.githubusername ? (
                    <ProfileGithub username = {profile.githubusername} />
                ) : null}

                    <ProfileGithub /> */}
                        </div>

            )
        }
    return (
      <div className = "profile">
        <div className = "container">
            <div className = "row">
                <div className = "col-md-12">
                {profileContent}
                
                
                </div>
            
            </div>
        
        
        </div>
     
      </div>
    )
  }
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps , {getProfileByHandle})(Profile);