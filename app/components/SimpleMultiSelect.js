import React from 'react'

class SimpleMultiSelect extends React.Component {

  handleChange = (event) => {
    const newSelectedOptions = [...event.target.selectedOptions].map( sel => sel.value );
    this.props.onChange(newSelectedOptions);
  }

  renderOptions() {
    const {options, selectedOptions} = this.props;

    return options.map( opt => (
      <option key={opt}>
        {opt}
      </option>
    ))
  }

  render() {
    const {selectedOptions} = this.props;

    return (
      <select multiple 
              value={selectedOptions}
              size={10}
              onChange={this.handleChange}>
        {this.renderOptions()}
      </select>
    )
  }
}

export default SimpleMultiSelect
