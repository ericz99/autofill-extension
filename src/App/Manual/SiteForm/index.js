import React, { useState, useEffect } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addNewSite, updateSite } from "../../../shared/actions/manualAction";

import Icon from "../../../shared/components/Icon";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import { Form, FormControl, Row, SplitControl, ButtonGroup } from "../Styles";

export default function SiteForm({ selectedSite }) {
  const [inputs, setInputs] = useState([]);
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  // # TODO: we need the correct inputs fields
  useEffect(() => {
    let fields = [];
    let newInputs = [];

    // # only if there is a selected site to be render
    if (Object.keys(selectedSite).length > 0) {
      for (let [key, value] of Object.entries(selectedSite)) {
        if (key === "siteName") {
          fields.push({ [key]: value });
        } else {
          let selectorField = {};
          let valueField = {};

          if (key.includes("selector")) {
            selectorField = {
              name: key,
              value,
            };
          } else {
            valueField = {
              name: key,
              value,
            };
          }

          console.log(selectorField);

          // # push it into the input array
          newInputs.push({ selector: selectorField, value: valueField });
        }
      }

      console.log(newInputs);

      // # SET VALUES
      setValue(fields);
      // # SET OUR INPUTS
      setInputs(newInputs);
    }
  }, [selectedSite, setValue]);

  const onSubmit = (data, e) => {
    // # dispatch add site
    dispatch(addNewSite(data));
  };

  // # create new input, if user adds more
  const createNewInput = () => {
    // # selector field
    const selectorField = {
      type: "text",
      name: `selector-path-${inputs.length + 1}`,
      bgColor: "rgba(171,183,183,1)",
      value: "",
    };

    // # value field
    const valueField = {
      type: "text",
      name: `value-${inputs.length + 1}`,
      bgColor: "rgba(171,183,183,1)",
      value: "",
    };

    // # set it to the input
    setInputs((all) => [
      ...all,
      { selector: selectorField, value: valueField },
    ]);
  };

  // # remove previous input
  const removePreviousInput = () => {
    if (inputs.length > 0) {
      const newInputs = [...inputs];
      newInputs.pop();
      // # set new inputs
      setInputs(newInputs);
    }
  };

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <FormControl>
              <Controller
                as={
                  <Input
                    type="text"
                    name="siteName"
                    bgColor="rgba(171,183,183,1)"
                    placeholder="Site Name"
                  />
                }
                control={control}
                defaultValue=""
                name="siteName"
              />
            </FormControl>
          </Row>
          {inputs.map((input) => {
            return (
              <Row>
                <SplitControl>
                  <Controller
                    as={
                      <Input
                        type="text"
                        name={input.selector.name}
                        bgColor="rgba(171,183,183,1)"
                        placeholder="Selector Path"
                      />
                    }
                    control={control}
                    defaultValue=""
                    name={input.selector.name}
                  />
                </SplitControl>
                <SplitControl>
                  <Controller
                    as={
                      <Input
                        type="text"
                        name={input.value.name}
                        bgColor="rgba(171,183,183,1)"
                        placeholder="Value"
                      />
                    }
                    control={control}
                    defaultValue=""
                    name={input.value.name}
                  />
                </SplitControl>
              </Row>
            );
          })}
          <ButtonGroup>
            <Button
              type="button"
              onClick={createNewInput}
              bgColor="#990033"
              color="#ffffff"
            >
              <Icon icon={faPlus} />
            </Button>
            <Button
              type="button"
              onClick={removePreviousInput}
              bgColor="#FF9900"
              color="#ffffff"
            >
              <Icon icon={faMinus} />
            </Button>
          </ButtonGroup>
          <FormControl>
            <Button type="submit" color="#ffffff" bgColor="#2574a9">
              Save Site
            </Button>
          </FormControl>
        </Form>
      </Row>
    </>
  );
}
