import React from "react";
import Input from "./common/input";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <div className="row">
      <i class="fa fa-search" aria-hidden="true"></i>
      <div className="col" >
      <Input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      </div>
    </div>
  );
};

export default SearchBox;
