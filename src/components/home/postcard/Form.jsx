import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContactBtn from "../../elements/ContactBtn.jsx";

const Form = (props) => {
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    let myForm = document.getElementById("contact-form");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        navigate("/Success");
      })
      .catch((error) => alert(error));
  };

  return (
    <Div>
      <Row>
        <Text>Contact 'Postcard' Form</Text>
        <Stamp>No Stamp Required</Stamp>
      </Row>

      <form
        id="contact-form"
        name="contact"
        method="post"
        data-netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        onSubmit={submitHandler}
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        <Row>
          <Message>
            <label htmlFor="message">Message*</label>
            <TextArea name="message" id="message" required></TextArea>
          </Message>
          <Address>
            <div>
              <label htmlFor="name">Name*</label>
              <Input type="text" name="name" id="name" required />
            </div>

            <div>
              <label htmlFor="email">Email *</label>
              <Input type="email" name="email" id="email" required />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Input type="tel" name="phone" id="phone" />
            </div>
          </Address>
        </Row>
        <RowBottom>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "220px",
            }}
          >
            <div>
              <Checkbox>
                <label htmlFor="consent">
                  <CheckboxLabel>
                    Please agree to be contacted regarding this message *
                  </CheckboxLabel>
                </label>
                <Tick type="checkbox" name="consent" id="consent" required />
              </Checkbox>
            </div>
          </div>
          <div>
            <Btn type="submit" name="submit" tagName={"Send"} />
          </div>
        </RowBottom>
      </form>
    </Div>
  );
};
const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 580px;
  height: 400px;
  border: 1.6px solid black;
  margin-bottom: 60px;
  @media (max-width: 620px) {
    width: 100%;
    max-width: 94%;
    height: 600px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 12px;
  @media (max-width: 620px) {
    flex-direction: column-reverse;
  }
`;

const Text = styled.p`
  max-width: 80px;
  font-size: 14px;
  text-align: left;
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -1px;
  margin-left: 32px;
  @media (max-width: 620px) {
    margin-left: 2px;
    margin-top: 12px;
    margin-bottom: -12px;
  }
`;

const Stamp = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 86px;
  border: solid 1.6px black;
  text-align: left;
  font-size: 10px;
  padding: 6px;
  @media (max-width: 620px) {
    top: 20px;
  }
`;

const Message = styled.div`
  height: 164px;
  width: 50%;
  position: relative;
  top: -20px;
  text-align: left;
  padding: 12px 12px 12px 8px;
  @media (max-width: 620px) {
    top: 5px;
    left: 20px;
  }
`;

const TextArea = styled.textarea`
  background: transparent;
  width: 220px;
  height: 180px;
  border: 0.1px solid black;
  @media (max-width: 620px) {
    width: 260px;
  }
  @media (max-width: 360px) {
    width: 220px;
  }
`;

const Address = styled.div`
  margin-top: 38px;
  width: 50%;
  text-align: left;
  padding: 12px;
  font-size: 14px;
  border: solid;
  border-width: 0 0 0 2px;
  @media (max-width: 620px) {
    border: none;
    margin-left: 20px;
    margin-top: 12px;
  }
`;

const RowBottom = styled.div`
  display: flex;
  position: relative;
  top: 55px;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  padding: 8px 12px;
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: 11px;
  line-height: 1.1;
  margin-left: 12px;
`;

const Tick = styled.input`
  width: 34px;
  height: 24px;
  border: 1px solid black;
  margin-right: 12px;
`;

const Btn = styled(ContactBtn)`
  border-radius: 16px;
`;

const Input = styled.input`
  border-bottom: 0.1px solid black;
  background: transparent;
  margin-top: 16px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  margin-left: 4px;

  &:focus {
    outline: 0.2px transparent solid;
    height: 16px;
    margin-left: 4px;
    background: #f7f7f7;
  }
`;

const CheckboxLabel = styled.p``;

export default Form;
