import React from "react";
import { useDispatch } from "react-redux";

import { selectSite } from "../../../shared/actions/manualAction";
import Select from "../../../shared/components/Select";

import { Row, FormControl } from "../Styles";

export default function SelectorForm({ sites }) {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;

    sites.forEach((item) => {
      if (item.siteName.trim().toLowerCase() === value.trim().toLowerCase()) {
        // # dispatch to redux state
        dispatch(selectSite(item));
      }
    });
  };

  return (
    <Row>
      <FormControl>
        <Select
          name="siteSelected"
          bgColor="rgba(171,183,183,1)"
          options={sites}
          onChange={handleOnChange}
          defaultValue="Choose an site"
          label="siteName"
        />
      </FormControl>
    </Row>
  );
}
