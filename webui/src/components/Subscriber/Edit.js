import { Component } from 'react';
import PropTypes from 'prop-types';

import withWidth, { SMALL } from 'helpers/with-width';
import { Form } from 'components';

const schema = {
  "title": "",
  "type": "object",
  "properties": {
    "imsi": {
      "type": "string", 
      "title": "IMSI (International Mobile Subscriber Identity)",
      "required": true,
      "pattern": "^\\d+$",
      "messages": {
        "pattern": "Only digits are allowed"
      }
    },
    "security": {
      "title": "Security",
      "type": "object",
      "properties": {
        "k": {
          "type": "string",
          "title": "K (UE Key)",
          "default": "465B5CE8 B199B49F AA5F0A2E E238A6BC",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "op": {
          "type": "string",
          "title": "OP (Operator Key)",
          "default": "5F1D289C 5D354D0A 140C2548 F5F3E3BA",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "amf": {
          "type": "string",
          "title": "AMF (Authentication Management Field)",
          "default": "8000",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        }
      }
    },
    "ue_ambr": {
      "type": "object",
      "title": "UE AMBR - Aggregate Maximum Bit Rate",
      "properties": {
        "max_bandwidth_ul": {
          "type": "number",
          "title": "Max Requested Bandwidth UL (Kbps)",
          "default": 1024000,
          "required": true
        },
        "max_bandwidth_dl": {
          "type": "number",
          "title": "Max Requested Bandwidth DL (Kbps)",
          "default": 1024000,
          "required": true
        }
      }
    },
    "pdn": {
      "type": "array",
      "title": "PDN - Packet Data Network",
      "minItems": 1,
      "messages": {
        "minItems": "At least one PDN is required"
      },
      "items": {
        "type": "object",
        "properties": {
          "apn": {
            "type": "string",
            "title": "APN (Access Point Name)",
            "default": "internet",
            "required": true
          },
          "qos": {
            "type": "object",
            "title": "EPS Subscribed QoS Profile",
            "properties": {
              "qci": {
                "type": "number",
                "title": "QCI (QoS Class Identifier)",
                "enum": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 65, 66, 69, 70 ],
                "default": 9
              },
              "arp" : {
                "type": "object",
                "title": "",
                "properties": {
                  "priority_level": {
                    "type": "number",
                    "title": "ARP Priority Level (1~15)",
                    "default": 8,
                    "minimum": 1,
                    "maximum": 15,
                    "required": true
                  }
                }
              }
            }
          },
          "pdn_ambr": {
            "type": "object",
            "title": "APN AMBR - Aggragate Maximum Bit Rate",
            "properties": {
              "max_bandwidth_ul": {
                "type": "number",
                "title": "Max Requested Bandwidth UL (Kbps)",
                "default": 1024000,
                "required": true
              },
              "max_bandwidth_dl": {
                "type": "number",
                "title": "Max Requested Bandwidth DL (Kbps)",
                "default": 1024000,
                "required": true
              }
            }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "imsi": {
    "ui:autofocus": true,
  },
  "pdn": {
    "ui:options":  {
      "orderable": false
    },
    "items": {
      "qos": {
        "qci": {
          "ui:widget": "radio",
          "ui:options": {
            "inline": true
          }
        }
      }
    }
  }
}

class Edit extends Component {
  static propTypes = {
    visible: PropTypes.bool, 
    title: PropTypes.string, 
    formData: PropTypes.object,
    validate: PropTypes.func, 
    onHide: PropTypes.func, 
    onSubmit: PropTypes.func
  }

  state = {
    schema,
    uiSchema
  };

  componentWillMount() {
    const { 
      width,
    } = this.props;

    if (width === SMALL) {
      let uiSchema = { ...this.state.uiSchema };
      delete uiSchema.imsi;
      this.setState({
        ...this.state,
        uiSchema
      });
    }
  }

  render() {
    const {
      visible,
      title,
      formData,
      validate,
      onHide,
      onSubmit
    } = this.props;

    return (
      <Form 
        visible={visible}
        title={title}
        schema={this.state.schema}
        uiSchema={this.state.uiSchema}
        formData={formData}
        validate={validate}
        onHide={onHide}
        onSubmit={onSubmit} />
    )
  }
}

export default withWidth()(Edit);