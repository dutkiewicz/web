import React from 'react';
import PropTypes from 'prop-types';
import {
  VALUE_SYMPTOM_LEVEL_1,
  VALUE_SYMPTOM_LEVEL_2,
  VALUE_SYMPTOM_LEVEL_3,
  VALUE_SYMPTOM_LEVEL_4
} from '../../constants';

import './Range.scss';

export const levels = {
  [VALUE_SYMPTOM_LEVEL_1]: 'Brak',
  [VALUE_SYMPTOM_LEVEL_2]: 'Słaby',
  [VALUE_SYMPTOM_LEVEL_3]: 'Umiarkowany',
  [VALUE_SYMPTOM_LEVEL_4]: 'Silny'
};

const Range = ({ disable, label, onClick, value }) => {
  const options = [
    VALUE_SYMPTOM_LEVEL_1,
    VALUE_SYMPTOM_LEVEL_2,
    VALUE_SYMPTOM_LEVEL_3,
    VALUE_SYMPTOM_LEVEL_4
  ].map(option => {
    const isActive = value === option ? 'active' : '';

    return (
      <button
        disabled={disable}
        className={`range__option ${isActive}`}
        key={option}
        onClick={() => onClick(option)}
        type="button"
      >
        {levels[option]}
      </button>
    );
  });

  return (
    <div className="range">
      <div className="range__label">{label}</div>
      <div className="range__track" />
      <div className="range__options">
        {options}
      </div>
    </div>
  );
};

Range.defaultProps = {
  disable: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Range;
