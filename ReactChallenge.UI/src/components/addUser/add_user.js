import React from 'react';
import $ from 'jquery';
//import PropTypes from 'prop-types';
import save from '../../actions/save';

const baseUrl = 'http://localhost:52481';

export default class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Age: 0,
            Image: '',
            Phone: '',
            Phrase: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHandleChangeName = this.onHandleChangeName.bind(this);
        this.onHandleChangeAge = this.onHandleChangeAge.bind(this);
        this.onHandleChangeImage = this.onHandleChangeImage.bind(this);
        this.onHandleChangePhone = this.onHandleChangePhone.bind(this);
        this.onHandleChangePhrase = this.onHandleChangePhrase.bind(this);
    }

    componentDidMount() {
        $(this.modal).modal('show');
        $(this.modal).on('hidden.bs.modal', this.props.onClick);
    };

    saveUser(baseUrl, formData) {
        const { update, data } = this.props;
        save(baseUrl, formData)
            .then(user => {
                update({
                    data: [...data, user]
                });
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    handleSubmit(e) {
        e.preventDefault();
        //const { update } = this.props;
        const form = {
            Name: this.state.Name,
            Age: this.state.Age,
            Phone: this.state.Phone,
            Phrase: this.state.Phrase,
            Image: this.state.Image
        }
        //const form = new FormData(e.target);
        this.saveUser(`${baseUrl}/api/users`, form);
        $(this.modal).modal('hide');
    }

    onHandleChangeName(e) {
        e.preventDefault();
        const Name = e.target.value;
        this.setState({
            Name
        })
    }

    onHandleChangeAge(e) {
        e.preventDefault();
        const Age = e.target.value;
        this.setState({
            Age
        })
    }

    onHandleChangeImage(e) {
        e.preventDefault();
        const Image = e.target.value;
        this.setState({
            Image
        })
    }

    onHandleChangePhone(e) {
        e.preventDefault();
        const Phone = e.target.value;
        this.setState({
            Phone
        })
    }

    onHandleChangePhrase(e) {
        e.preventDefault();
        const Phrase = e.target.value;
        this.setState({
            Phrase
        })
    }

    render() {
        return (
            <div className="modal fade user-add-form"
                ref={modal => this.modal = modal} id="Modal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" >
                            <h4 className="modal-title form-title">User information</h4>
                            <button type="button" className="close ml-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit} id="formModal">
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                                    <input
                                        value={this.state.Name}
                                        onChange={this.onHandleChangeName}
                                        name="Name"
                                        type="text"
                                        className="form-control"
                                        id="recipient-name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-age" className="col-form-label">Age:</label>
                                    <input
                                        value={this.state.Age}
                                        onChange={this.onHandleChangeAge}
                                        name="Age"
                                        type="text"
                                        className="form-control"
                                        id="recipient-age" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-animal" className="col-form-label">Favourite animal:</label>
                                    <input
                                        value={this.state.Image}
                                        onChange={this.onHandleChangeImage}
                                        name="Image"
                                        type="text"
                                        className="form-control"
                                        id="recipient-animal" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-phone" className="col-form-label">Phone:</label>
                                    <input
                                        value={this.state.Phone}
                                        onChange={this.onHandleChangePhone}
                                        name="Phone"
                                        type="text"
                                        className="form-control"
                                        id="recipient-phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-phrase" className="col-form-label">Phrase:</label>
                                    <textarea
                                        value={this.state.Phrase}
                                        onChange={this.onHandleChangePhrase}
                                        name="Phrase"
                                        className="form-control"
                                        id="message-phrase"></textarea>
                                </div>
                            </form>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.closeAddForm}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

// AddUser.propTypes = {
//     closeAddForm: PropTypes.func.isRequired
// }