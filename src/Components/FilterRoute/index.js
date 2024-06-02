import './index.css'
import ProfileRoute from '../ProfileRoute'

const FilterRoute = props => {
  //   Type of Employment
  const getTypeOfEmployment = () => {
    const {employmentTypesList} = props

    return (
      <ul className="employment-type-list">
        {employmentTypesList.map(eachItem => {
          const {changeEmployeeList} = props
          const onSelectEmployeeType = event => {
            changeEmployeeList(event.target.value)
          }
          return (
            <li className="type-item" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                className="checkbox-tag"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
                onChange={onSelectEmployeeType}
              />
              <label className="type-label" htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  //   Salary Range
  const getSalaryRangeView = () => {
    const {salaryRangesList} = props
    return (
      <ul className="salary-range-list">
        {salaryRangesList.map(eachItem => {
          const {changeSalary} = props
          const onClickSalary = () => {
            changeSalary(eachItem.salaryRangeId)
          }
          return (
            <li
              className="range-item"
              key={eachItem.salaryRangeId}
              onClick={onClickSalary}
            >
              <input
                type="radio"
                className="radio-tag"
                name="option"
                id={eachItem.salaryRangeId}
              />
              <label className="range-label" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <ProfileRoute />
      <hr />
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        {getTypeOfEmployment()}
      </div>
      <hr />
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        {getSalaryRangeView()}
      </div>
    </>
  )
}

export default FilterRoute
