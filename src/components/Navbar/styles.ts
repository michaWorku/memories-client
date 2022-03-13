import { makeStyles } from '@material-ui/core'

const commonFlexGap = {
  display: 'flex',
  gap: '0.75rem',
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  menu: {
    '& div': {
      padding: '0.2rem',
    },
    '& li': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 auto',
      padding: '5px',
    },
    '& li:nth-child(3)': {
      marginBottom: theme.spacing(1),
    },
    // Log out menu item
    '& li:nth-child(5)': {
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.secondary.main,
    },
  },
  logo: {
    marginRight: '0.75rem',
    width: '2.5rem',
    height: '2.5rem',
  },
  title: {
    marginRight: 'auto',
  },
  buttonsContainer: commonFlexGap,
  profile: commonFlexGap,
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: '2rem',
    height: '2rem',
    [theme.breakpoints.up('sm')]: {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
  avatarLetter: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  hamburgerIcon: {
    color: 'white',
    marginLeft: 'auto',
  },
   brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

export default useStyles
