import React, { useState, Fragment } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import EmployeeDataService from "../services/EmployeeService";
import { AddHeading } from "./Headings/AddHeading";

const AddEmployee = () => {
	const initialEmployeeState = {
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		street: "",
		city: '',
		state: '',
		zip: '',
		status: 'Inactive'
	};
	const [employee, setEmployee] = useState(initialEmployeeState);
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();

	const handleInputChange = event => {
		const { name, value } = event.target;
		setEmployee({ ...employee, [name]: value });
	};

	const saveEmployee = () => {
		if (employee.firstName === '' || employee.lastName === '' || employee.email === '' || employee.phone === '' ||
			employee.street === '' || employee.city === '' || employee.state === '' || employee.zip === '') {
			console.log('Missing parameters')
			return {
			}
		}

		let data = {
			name: employee.firstName + ' ' + employee.lastName,
			email: employee.email,
			phone: employee.phone,
			address: employee.street + ' ' + employee.city + ', ' + employee.state + ' ' + employee.zip,
			status: 'Inactive'
		};

		EmployeeDataService.create(data)
			.then(response => {

				/*setEmployee({
					id: data.id,
					name: data.name,
					email: data.email,
					phone: data.phone,
					address: data.address,
					status: data.status
				});*/
				console.log(response.data);
				history.push('/')
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<Fragment>
			<AddHeading />
			<div className="container mt-4">
				<div className="submit-form">
					<form onSubmit={handleSubmit(saveEmployee)}>
						<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required" htmlFor="firstName">
									First Name
						  </label>
								<input
									className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
									value={employee.firstName || ''}
									onChange={handleInputChange}
									name="firstName"
									id="firstName"
									type="text"
									placeholder="Enter first name"
									ref={register({
										required: true
									})}
								/> {errors.firstName && (<p className='text-red-700'>First Name is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
									Last Name
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
									value={employee.lastName || ''}
									onChange={handleInputChange}
									name="lastName"
									id="lastName"
									type="text"
									placeholder="Enter last name"
									ref={register({
										required: true
									})}
								/> {errors.lastName && (<p className='text-red-700'>Last Name is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" type="email" htmlFor="email">
									Email
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
									value={employee.email || ''}
									onChange={handleInputChange}
									name="email"
									id="email"
									type="text"
									placeholder="Enter email"
									ref={register({
										required: true
									})}
								/> {errors.email && (<p className='text-red-700'>Email is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" type="tel" max="14" htmlFor="phone">
									Phone
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
									value={employee.phone || ''}
									onChange={handleInputChange}
									name="phone"
									id="phone"
									type="text"
									placeholder="Enter phone"
									ref={register({
										required: true
									})}
								/> {errors.phone && (<p className='text-red-700'>Phone is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
									Street Address
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
									value={employee.street || ''}
									onChange={handleInputChange}
									name="street"
									id="street"
									type="text"
									placeholder="Enter street address"
									ref={register({
										required: true
									})}
								/> {errors.street && (<p className='text-red-700'>Street Address is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
									City
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
									value={employee.city || ''}
									onChange={handleInputChange}
									name="city"
									id="city"
									type="text"
									placeholder="Enter city"
									ref={register({
										required: true
									})}
								/> {errors.city && (<p className='text-red-700'>City is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
									State
							  </label>
								<select className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
									value={employee.state || ''}
									placeholder="Choose State"
									onChange={handleInputChange}
									name="state"
									ref={register({
										required: true
									})}>
									<option value="" defaultValue disabled hidden>Select State</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</select> {errors.state && (<p className='text-red-700'>State is Required</p>)}
							</div>

							<div className="w-full mb-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zip">
									Zip
							  </label>
								<input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
									value={employee.zip || ''}
									onChange={handleInputChange}
									name="zip"
									id="zip"
									type="text"
									placeholder="Enter zip"
									ref={register({
										required: true
									})}
								/> {errors.zip && (<p className='text-red-700'>Zip is Required</p>)}
							</div>
							<div className="flex items-center justify-between">
								<button type="submit" className="mb-3 mt-3 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
									Add Employee
							  </button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default AddEmployee;
