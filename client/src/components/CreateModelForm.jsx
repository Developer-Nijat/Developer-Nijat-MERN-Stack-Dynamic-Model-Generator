import { useEffect, useState } from "react";
import axios from "axios";

const mongooseSchemaTypes = [
  "String",
  "Number",
  "Date",
  "Boolean",
  "Array",
  "Map",
  "Mixed",
  "ObjectId",
];

function CreateModelForm() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [modelNames, setModelNames] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldRef, setFieldRef] = useState("");
  const [fieldIsRequired, setFieldIsRequired] = useState(false);
  const [fieldIsUnique, setFieldIsUnique] = useState(false);

  useEffect(() => {
    fetchModelNames();
  }, []);

  const addField = () => {
    if (!fieldType || !fieldName) {
      alert("Field name and Field type is required");
      return;
    }

    const fieldObj = { name: fieldName, type: fieldType };
    if (fieldRef) {
      fieldObj.ref = fieldRef;
    }
    if (fieldIsRequired) {
      fieldObj.required = true;
    }
    if (fieldIsUnique) {
      fieldObj.unique = true;
    }

    setFields([...fields, fieldObj]);

    setFieldName("");
    setFieldType("");
    setFieldRef("");
    setFieldIsRequired(false);
    setFieldIsUnique(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(fields).length === 0) {
      alert("Please add a field");
      return;
    }

    const newModel = { modelName: name, fields };

    try {
      const response = await axios.post(
        "http://localhost:4000/generate-model",
        newModel
      );
      console.log("Model created:", response.data);
      setFields([]);
      setName("");
      setTimeout(() => {
        fetchModelNames();
      }, 10000);
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
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <h6>Model name</h6>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Model Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h6>Create field</h6>
                <div className="card p-2">
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
                    <option>--Select Field Type--</option>
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
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={fieldIsRequired}
                      onChange={(e) => setFieldIsRequired(e.target.checked)}
                    />
                    <label className="form-check-label">Required</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={fieldIsUnique}
                      onChange={(e) => setFieldIsUnique(e.target.checked)}
                    />
                    <label className="form-check-label">Unique</label>
                  </div>
                  <br />
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={addField}
                    >
                      Add Field
                    </button>
                  </div>
                  {/* <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={addField}
                  >
                    Add Field
                  </button> */}
                </div>
                <div className="mt-4 mb-4 alert alert-secondary">
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
              <div className="d-grid gap-2">
                <button className="btn btn-success btn-lg" type="submit">
                  Create Model
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <div className="col-md-6">
          <h3>Created Models</h3>
          <ul className="list-group">
            {modelNames.map((modelName) => (
              <li key={modelName} className="list-group-item">
                {modelName}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default CreateModelForm;
