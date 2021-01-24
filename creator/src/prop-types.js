import PropTypes from 'prop-types';

export const noticeType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const noticeObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  notices: PropTypes.arrayOf(noticeType),
});
