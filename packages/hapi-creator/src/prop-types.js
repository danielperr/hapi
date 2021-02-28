import PropTypes from 'prop-types';

export const noticeType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const noticeObjectType = PropTypes.oneOfType([
  PropTypes.exact({
    id: PropTypes.string.isRequired,
    notices: PropTypes.arrayOf(noticeType),
  }),
  PropTypes.object,
]);
