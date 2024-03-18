
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postSlice";


export default function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    //without redux
    // //get stored token
    // const token = localStorage.getItem("authToken");

    // //decode the token to fetch user id
    // const decode = jwtDecode(token);
    // const userId = decode.id

    // //prepare data to be sent

    // const data = {
    //   title: "Post Title",
    //   content: postContent,
    //   user_id: userId,
    // };

    // //make ur api call
    // axios
    //   .post('https://18e54fed-2349-455e-95a0-6aec4157edbc-00-3jei4bte9wnwa.picard.replit.dev/posts', data)
    //   .then((response) => {
    //     console.log("Success:", response.data);
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.error("Error", error);
    //   })

    dispatch(savePost(postContent));
    handleClose();
    setPostContent("");
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton ></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent" >
              <Form.Control
                placeholder="What is happening?"
                as='textarea'
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}