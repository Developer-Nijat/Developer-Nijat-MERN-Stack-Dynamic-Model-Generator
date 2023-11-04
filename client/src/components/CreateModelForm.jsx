import { useEffect, useState } from "react";
import axios from "axios";

const mongooseSchemaTypes = [
  "String",
  "Number",
  "Date",
  "Boolean",
  "Array",
  "Object",
  "ObjectId",
];

function CreateModelForm() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [modelNames, setModelNames] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldRef, setFieldRef] = useState("");

  useEffect(() => {
    fetchModelNames();
  }, []);

  const addField = () => {
    if (!fieldType || !fieldName) {
      alert("Please fill the required fields");
      return;
    }
    if (fieldRef) {
      setFields([
        ...fields,
        { name: fieldName, type: fieldType, ref: fieldRef },
      ]);
    } else {
      setFields([...fields, { name: fieldName, type: fieldType }]);
    }

    setFieldName("");
    setFieldType("");
    setFieldRef("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newModel = { modelName: name, fields };

    try {
      const response = await axios.post(
        "http://localhost:4000/generate-model",
        newModel
      );
      console.log("Model created:", response.data);
    } catch (error) {
      console.error("Error creating model:", error);
    }
  };

  const fetchModelNames = async () => {
    try {
      const response = await axios.get("http://localhost:4000/models");
      if (response.status === 200) {
        setModelNames(response.data);
      }
    } catch (error) {
      console.log("fetchModelNames error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Field Name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                  />
                  <select
                    className="form-control mb-3"
                    value={fieldType}
                    onChange={(e) => setFieldType(e.target.value)}
                  >
                    <option>--Select Type--</option>
                    {mongooseSchemaTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {fieldType === "ObjectId" && (
                    <select
                      className="form-control mb-3"
                      value={fieldRef}
                      onChange={(e) => setFieldRef(e.target.value)}
                    >
                      <option>--Select Ref--</option>
                      {modelNames.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={addField}
                  >
                    Add Field
                  </button>
                </div>
                <hr />
                <div className="card mb-4">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <span>
                        {field.name} - {field.type}
                        {field.ref ? ` - ${field.ref}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Model Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-secondary" type="submit">
                  Create Model
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModelForm;
