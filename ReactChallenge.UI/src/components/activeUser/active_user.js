import React from "react";

export default class ActiveUser extends React.Component {
  render() {
    const { activeUser, data } = this.props;

    if (!data || !data[activeUser]) {
      return <h3>Nothing was found...</h3>;
    }

    const { Name, Age, Image, Phrase, Phone } = data[activeUser];

    return (
      <div className="thumbnail position-fixed">
        <img className="card-img-top" src={`images/${Image}.svg`} alt={Image} />

        <div className="thumbnail-caption">
          <table className="user-info table table-responsive">
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{Name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{Age}</td>
              </tr>
              <tr>
                <td>Favourite animal:</td>
                <td>{Image}</td>
              </tr>
              <tr>
                <td>Phone: </td>
                <td>{Phone}</td>
              </tr>
            </tbody>
          </table>

          <div>
            <span className="">
              <b>Phraze:</b>
            </span>
            <br />
            <blockquote className="text-center mt-4">
              <i
                className="fa fa-quote-left mr-2 align-top"
                aria-hidden="true"
              />
              {Phrase}
              <hr />
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}
