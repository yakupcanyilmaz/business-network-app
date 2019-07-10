import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
import NoImage from "../../img/no-img.png";

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date, image },
  auth,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        {image === "" ? (
          <img src={NoImage} alt="" className="round-img" />
        ) : (
          <img
            src={`/api/profile/image/${image}`}
            alt=""
            className="round-img"
          />
        )}
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        <Moment fromat="YYYY/MM/DD">{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={e => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
