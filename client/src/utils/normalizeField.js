const normalizeField = value => {
  if (!value || /^\s/.test(value)) {
    return '';
  }

  const normalizedValue = value.replace(/\s\s+/g, ' ');

  return normalizedValue;
};

export default normalizeField;
