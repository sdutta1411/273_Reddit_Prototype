{/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Settle</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Name"
              type="text"
              fullWidth
              onChange={(event) => {
                setsearchUser(event.target.value);
              }}
            />
            {userids
              .filter((val) => {
                if (searchUser === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchUser.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <Button onClick={(e) => setSettleUser(val.email)}>
                    {val.name}
                  </Button>
                );
              })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onSettleUp} color="primary">
              Settle
            </Button>
          </DialogActions>
        </Dialog>

const fetchAllUserids = () => {
    debugger;
    Axios.post("http://localhost:3002/routes/users/")
      .then((response) => {
        console.log(response);
        const allusers = response.data.users;
        users = response.data.users;
        setuserids(allusers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [userids, setuserids] = useState([]);
  const [searchUser, setsearchUser] = useState("");
  useEffect(() => {
    
    fetchAllUserids();
  }, []);
 */}