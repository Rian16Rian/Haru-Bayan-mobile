import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  // === CAROUSEL ===
  slide: {
    width: width,
    height: 220,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  carouselContent: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 50,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  carouselCaption: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  orderNowBtn: {
    backgroundColor: '#ffc7c9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  orderNowText: {
    color: '#000000',
    fontWeight: 'bold',
  },

  // === GENERAL LAYOUT ===
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#808080',
    marginVertical: 20,
  },
  sectionWrapper: {
    marginBottom: 20,
  },

  // === DINE-IN & DELIVERY ===
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9b001e',
    padding: 10,
    borderRadius: 12,
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  optionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  // === ABOUT US ===
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 3,
  },
  aboutImage: {
    width: '60%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: -10,
    marginLeft: -22,
  },
  aboutTextBox: {
    width: '55%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#680303',
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },

  // === STRONG POINT SECTION ===
  strongSection: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  strongTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#680303',
    marginBottom: 10,
    textAlign: 'left',
  },
  strongTextBox: {
    width: '100%',
    backgroundColor: '#800000',
    padding: 15,
    borderRadius: 8,
  },
  strongText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'justify',
  },

  // === STATS SECTION ===
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    width: '22%',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#680303',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  stat: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9b001e',
  },

  // === CONTACT US SECTION ===
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    maxWidth: 800,
    alignSelf: 'center',
  },
  contactLeft: {
    flex: 1,
    minWidth: '45%',
    marginRight: 10,
  },
  contactRight: {
    flex: 1,
    minWidth: '45%',
  },
  contactCard: {
    backgroundColor: '#680303',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  contactCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f3ecec',
    marginBottom: 5,
    },
    contactCardDescription: {
    color: '#f3ecec', // Light color for readability on dark background
    marginBottom: 5,
  },
    
  contactLink: {
    color: '#f3ecec',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  contactFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  contactInput: {
    borderColor: '#680303',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffe6e6',
    shadowColor: '#680303',
    shadowOpacity: 0.25,
    shadowOffset: { width: 5, height: 2 },
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendButton: {
    backgroundColor: '#680303',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#f3ecec',
    fontWeight: 'bold',
  },

  // === TEAM SECTION ===
  teamSection: {
    backgroundColor: '#372327',
    paddingVertical: 15,
    marginBottom: 60, 
  },
  ITteam: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#ffffff',
    backgroundColor: '#372327',
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: '#372327',
    marginVertical: 10,
  },
  teamCard: {
    alignItems: 'center',
    margin: 10,
  },
  teamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  memberName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 5,
  },
  memberRole: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // === SUSHI IMAGE ===
  sushiImage: {
    width: '100%',
    height: 250, // Adjusted to prevent image from taking too much space
    resizeMode: 'contain',
    marginVertical: 20,
  },
});
