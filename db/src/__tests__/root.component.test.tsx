import React from "react";
import { shallow } from "enzyme";
import Root from "../root.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const wrapper = shallow(<Root name="db" />);
    expect(wrapper).toBeDefined();
    // console.log(wrapper.debug());
    // expect(wrapper.text()).toContain("db is mounted!");
  });
});
