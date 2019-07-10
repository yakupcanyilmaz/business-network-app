import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addImage, deleteImage } from "../../actions/profile";
import NoImage from "../../img/no-img.png";
import Spinner from "../layout/Spinner";

const AddImage = ({ profile: { profile, loading }, addImage, deleteImage }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose Picture");

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.image === "" ? (
        <Fragment>
          <img src={NoImage} alt="" className="profile-img" />
          <form
            className="custom-file-form"
            onSubmit={e => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("file", file);
              addImage(formData);
            }}
          >
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={e => {
                  setFile(e.target.files[0]);
                  setFilename(e.target.files[0].name);
                }}
              />
              <label htmlFor="cusomFile" className="custom-file-label">
                {filename}
              </label>
            </div>
            <input
              type="submit"
              value="Upload"
              className="btn btn-primary custom-file-btn"
            />
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <img
            src={`/api/profile/image/${profile.image}`}
            alt=""
            className="profile-img"
          />
          <button
            onClick={() => {
              deleteImage(profile.image);
            }}
            className="btn btn-danger custom-file-delete-btn my"
          >
            Delete Picture
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

AddImage.propTypes = {
  addImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addImage, deleteImage }
)(AddImage);
