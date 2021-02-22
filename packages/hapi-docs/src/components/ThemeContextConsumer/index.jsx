import React from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';

export default function ThemeContextConsumer({ children }) {
  return children(useThemeContext());
}
