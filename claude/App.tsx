import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Section = 'Home' | 'Classes' | 'Materials' | 'Tests' | 'Results' | 'Updates';

const colors = {
  navy: '#4A1113',
  blue: '#B91C1C',
  sky: '#FBEAEA',
  ink: '#241414',
  muted: '#7A6363',
  line: '#EFE2E2',
  canvas: '#FAF6F6',
  white: '#FFFFFF',
  green: '#15803D',
  amber: '#B45309',
  red: '#C2410C',
};

const classes = [
  { subject: 'Chemistry · XII', topic: 'Electrochemistry', teacher: 'A. P. Tripathi Sir', time: 'Today · 5:00 PM', color: '#FBE2E2', icon: '⚗' },
  { subject: 'Chemistry · XI', topic: 'Chemical Bonding', teacher: 'A. P. Tripathi Sir', time: 'Tomorrow · 7:00 AM', color: '#FFF3D6', icon: '🧪' },
  { subject: 'Chemistry · XII', topic: 'Aldehydes, Ketones & Carboxylic Acids', teacher: 'A. P. Tripathi Sir', time: 'Tomorrow · 5:00 PM', color: '#E4ECFB', icon: '⚛' },
];

const materials = [
  { title: 'Electrochemistry — Revision Notes', subject: 'Chemistry · XII', meta: 'PDF · 2.4 MB', color: '#FBE2E2' },
  { title: 'Chemical Bonding — Concept Sheet', subject: 'Chemistry · XI', meta: 'PDF · 1.6 MB', color: '#FFF3D6' },
  { title: 'Organic Reactions Master List', subject: 'Chemistry · XII', meta: 'PDF · 3.1 MB', color: '#E4ECFB' },
  { title: 'JEE Chemistry Formula Handbook', subject: 'Chemistry · XI–XII', meta: 'PDF · 4.8 MB', color: '#FCEBD5' },
];

const tests = [
  { title: 'JEE Chemistry Mock Test 07', detail: 'Full syllabus · 3 hours', status: 'Starts 15 Sep, 10:00 AM', action: 'View details' },
  { title: 'Electrochemistry Quiz', detail: '20 questions · 30 mins', status: 'Available until 16 Sep', action: 'Start test' },
  { title: 'Chemical Bonding Weekly Test', detail: '25 questions · 45 mins', status: 'Not attempted', action: 'Start test' },
];

const results = [
  { title: 'JEE Chemistry Mock Test 06', score: '82 / 100', percent: '91st percentile', fill: '82%', tone: colors.blue },
  { title: 'Electrochemistry Unit Test', score: '46 / 50', percent: 'Top 8%', fill: '92%', tone: colors.green },
  { title: 'Chemical Bonding Weekly Test', score: '22 / 25', percent: '88%', fill: '88%', tone: '#7C3AED' },
];

const announcements = [
  { tag: 'IMPORTANT', title: 'Sunday doubt-solving session', body: 'Bring your pending Chemistry questions for the in-person session this Sunday at 11:00 AM.', date: 'Today' },
  { tag: 'EXAM', title: 'Mock test reporting time', body: 'Please reach the centre at least 20 minutes before the test begins.', date: 'Yesterday' },
  { tag: 'GENERAL', title: 'New batch starting soon', body: 'New XI & XII Chemistry batches are starting — limited seats, free demo class available.', date: '12 Sep' },
];

const centre = {
  address: '3-C-2, Malviya Nagar, Jaipur — Opp. Jain Mandir, Satkar Shopping Centre',
  phones: '98291 70598  ·  99509 70598',
  note: '25+ years of experience · Free demo class available',
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState<Section>('Home');
  const [studentId, setStudentId] = useState('SSC-2026-0417');
  const [password, setPassword] = useState('welcome');

  if (!loggedIn) {
    return <Login studentId={studentId} password={password} onId={setStudentId} onPassword={setPassword} onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
        <Header section={section} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {section === 'Home' && <Home onNavigate={setSection} />}
          {section === 'Classes' && <Classes />}
          {section === 'Materials' && <Materials />}
          {section === 'Tests' && <Tests />}
          {section === 'Results' && <Results />}
          {section === 'Updates' && <Updates />}
        </ScrollView>
        <BottomNav section={section} onChange={setSection} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Login({ studentId, password, onId, onPassword, onLogin }: { studentId: string; password: string; onId: (x: string) => void; onPassword: (x: string) => void; onLogin: () => void }) {
  return <SafeAreaProvider><SafeAreaView style={styles.loginSafe} edges={['top', 'bottom']}><StatusBar barStyle="light-content" backgroundColor={colors.navy} />
    <View style={styles.loginHero}><View style={styles.logo}><Image source={require('./assets/logo.png')} style={styles.logoImage} resizeMode="contain" /></View><Text style={styles.brand}>S. S. CLASSES</Text><Text style={styles.brandSub}>TRIPATHI’S CHEMISTRY COACHING</Text></View>
    <View style={styles.loginPanel}><Text style={styles.loginTitle}>Welcome back</Text><Text style={styles.loginCopy}>Sign in to continue your Chemistry preparation.</Text>
      <Text style={styles.label}>Student ID</Text><TextInput style={styles.input} value={studentId} onChangeText={onId} autoCapitalize="characters" placeholder="Enter student ID" />
      <Text style={styles.label}>Password</Text><TextInput style={styles.input} value={password} onChangeText={onPassword} secureTextEntry placeholder="Enter password" />
      <Pressable style={styles.primaryButton} onPress={onLogin}><Text style={styles.primaryText}>Sign in</Text></Pressable>
      <Text style={styles.help}>Need help? Contact your centre coordinator</Text>
    </View><Text style={styles.version}>Tripathi’s S. S. Classes · Version 1.0</Text>
  </SafeAreaView></SafeAreaProvider>;
}

function Header({ section }: { section: Section }) { return <View style={styles.header}><View><Text style={styles.headerEyebrow}>{section === 'Home' ? 'MONDAY, 14 SEPTEMBER' : 'STUDENT PORTAL'}</Text><Text style={styles.headerTitle}>{section === 'Home' ? 'Good morning, Aarav' : section}</Text></View><View style={styles.avatar}><Text style={styles.avatarText}>AK</Text></View></View>; }

function Home({ onNavigate }: { onNavigate: (s: Section) => void }) { return <>
  <View style={styles.progressCard}><View style={styles.progressTop}><View><Text style={styles.cardKicker}>YOUR PREPARATION</Text><Text style={styles.progressTitle}>JEE Chemistry 2026</Text></View><Text style={styles.percent}>72%</Text></View><View style={styles.track}><View style={[styles.fill, { width: '72%' }]} /></View><Text style={styles.progressCaption}>18 days left to the next full mock test</Text></View>
  <SectionTitle title="Today’s schedule" action="See all" onPress={() => onNavigate('Classes')} />
  <View style={styles.todayCard}><View style={styles.timeBlock}><Text style={styles.time}>5:00</Text><Text style={styles.meridiem}>PM</Text></View><View style={styles.todayInfo}><Text style={styles.className}>Chemistry · Electrochemistry</Text><Text style={styles.teacher}>A. P. Tripathi Sir · Live class</Text></View><Text style={styles.join}>Join</Text></View>
  <SectionTitle title="Quick access" />
  <View style={styles.quickGrid}>{[['▣', 'Classes', 'Classes'], ['▤', 'Materials', 'Materials'], ['✓', 'Tests', 'Tests'], ['◔', 'Results', 'Results']].map(([icon, label, target]) => <Pressable key={label} style={styles.quick} onPress={() => onNavigate(target as Section)}><Text style={styles.quickIcon}>{icon}</Text><Text style={styles.quickLabel}>{label}</Text></Pressable>)}</View>
  <SectionTitle title="Latest update" action="View all" onPress={() => onNavigate('Updates')} />
  <View style={styles.updateCard}><View style={styles.noticeDot} /><View style={styles.updateText}><Text style={styles.updateTitle}>Sunday doubt-solving session</Text><Text style={styles.updateBody}>Bring your pending questions · Today</Text></View><Text style={styles.chevron}>›</Text></View>
</> }

function Classes() { return <><Text style={styles.pageIntro}>Your upcoming live and classroom Chemistry sessions.</Text>{classes.map((item, index) => <View style={styles.classCard} key={item.topic}><View style={[styles.subjectIcon, { backgroundColor: item.color }]}><Text style={styles.subjectIconText}>{item.icon}</Text></View><View style={styles.classInfo}><Text style={styles.classSubject}>{item.subject}</Text><Text style={styles.classTopic}>{item.topic}</Text><Text style={styles.classMeta}>{item.teacher} · {item.time}</Text></View><Text style={[styles.classStatus, index === 0 && styles.statusLive]}>{index === 0 ? 'LIVE' : 'UPCOMING'}</Text></View>)}</> }
function Materials() { return <><Text style={styles.pageIntro}>Notes, practice sheets and revision resources from Tripathi Sir.</Text>{materials.map(item => <Pressable style={styles.materialCard} key={item.title}><View style={[styles.fileIcon, { backgroundColor: item.color }]}><Text style={styles.fileIconText}>PDF</Text></View><View style={styles.materialInfo}><Text style={styles.materialTitle}>{item.title}</Text><Text style={styles.materialMeta}>{item.subject} · {item.meta}</Text></View><Text style={styles.download}>↓</Text></Pressable>)}</> }
function Tests() { return <><View style={styles.infoBanner}><Text style={styles.infoBannerText}>You have 2 tests waiting to be attempted.</Text></View>{tests.map((test, index) => <View style={styles.testCard} key={test.title}><Text style={styles.testTitle}>{test.title}</Text><Text style={styles.testDetail}>{test.detail}</Text><View style={styles.testBottom}><Text style={styles.testStatus}>{test.status}</Text><Pressable style={[styles.outlineButton, index === 0 && styles.blueButton]}><Text style={[styles.outlineText, index === 0 && styles.blueText]}>{test.action}</Text></Pressable></View></View>)}</> }
function Results() { return <><View style={styles.rankCard}><Text style={styles.rankKicker}>CURRENT PERFORMANCE</Text><Text style={styles.rankNumber}>#18 <Text style={styles.rankSuffix}>of 240 students</Text></Text><Text style={styles.rankCopy}>Your rank improved by 6 places this week. Keep it up!</Text></View>{results.map(result => <View style={styles.resultCard} key={result.title}><View style={styles.resultTop}><View><Text style={styles.resultTitle}>{result.title}</Text><Text style={styles.resultPercent}>{result.percent}</Text></View><Text style={styles.score}>{result.score}</Text></View><View style={styles.resultTrack}><View style={[styles.resultFill, { width: result.fill, backgroundColor: result.tone }]} /></View></View>)}</> }
function Updates() { return <><Image source={require('./assets/classroom.png')} style={styles.classroomBanner} resizeMode="cover" /><View style={styles.contactCard}><Text style={styles.contactKicker}>TRIPATHI'S S. S. CLASSES</Text><Text style={styles.contactAddress}>{centre.address}</Text><Text style={styles.contactPhones}>{centre.phones}</Text><Text style={styles.contactNote}>{centre.note}</Text></View>{announcements.map(item => <View style={styles.announcement} key={item.title}><View style={styles.announceHead}><Text style={styles.tag}>{item.tag}</Text><Text style={styles.date}>{item.date}</Text></View><Text style={styles.announceTitle}>{item.title}</Text><Text style={styles.announceBody}>{item.body}</Text></View>)}</> }
function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) { return <View style={styles.sectionTitle}><Text style={styles.sectionHeading}>{title}</Text>{action && <Pressable onPress={onPress}><Text style={styles.sectionAction}>{action}</Text></Pressable>}</View> }
function BottomNav({ section, onChange }: { section: Section; onChange: (x: Section) => void }) { const items: [Section, string, string][] = [['Home', '⌂', 'Home'], ['Classes', '▣', 'Classes'], ['Tests', '✓', 'Tests'], ['Updates', '●', 'Updates']]; return <View style={styles.nav}>{items.map(([key, icon, label]) => <Pressable style={styles.navItem} onPress={() => onChange(key)} key={key}><Text style={[styles.navIcon, section === key && styles.navActive]}>{icon}</Text><Text style={[styles.navLabel, section === key && styles.navActive]}>{label}</Text></Pressable>)}</View> }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas }, loginSafe: { flex: 1, backgroundColor: colors.navy }, loginHero: { alignItems: 'center', justifyContent: 'center', height: '38%', gap: 6 }, logo: { width: 62, height: 62, borderRadius: 18, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 8, overflow: 'hidden' }, logoImage: { width: '100%', height: '100%' }, logoText: { fontSize: 36, fontWeight: '800', color: colors.navy }, brand: { color: colors.white, fontSize: 24, letterSpacing: 3, fontWeight: '800' }, brandSub: { color: '#E8C3C3', fontSize: 10, letterSpacing: 2.3, fontWeight: '700' }, loginPanel: { flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 28 }, loginTitle: { fontSize: 26, fontWeight: '800', color: colors.ink }, loginCopy: { fontSize: 14, color: colors.muted, marginTop: 7, marginBottom: 30 }, label: { fontSize: 13, fontWeight: '700', color: colors.ink, marginBottom: 8 }, input: { height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 14, fontSize: 15, color: colors.ink, marginBottom: 20, backgroundColor: '#FEFCFC' }, primaryButton: { height: 54, borderRadius: 13, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', marginTop: 6 }, primaryText: { color: colors.white, fontSize: 16, fontWeight: '800' }, help: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 24 }, version: { position: 'absolute', bottom: 16, alignSelf: 'center', color: '#C79999', fontSize: 11 }, header: { height: 104, paddingHorizontal: 20, paddingTop: 18, backgroundColor: colors.navy, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerEyebrow: { color: '#E3B4B4', fontSize: 10, letterSpacing: .8, fontWeight: '700' }, headerTitle: { color: colors.white, fontWeight: '800', fontSize: 23, marginTop: 4 }, avatar: { height: 42, width: 42, borderRadius: 21, backgroundColor: '#F5AE32', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: colors.navy, fontWeight: '800', fontSize: 13 }, content: { padding: 20, paddingBottom: 100, gap: 16 }, progressCard: { backgroundColor: colors.white, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#F1E4E4' }, progressTop: { flexDirection: 'row', justifyContent: 'space-between' }, cardKicker: { fontSize: 10, letterSpacing: .7, color: colors.muted, fontWeight: '700' }, progressTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', marginTop: 5 }, percent: { color: colors.blue, fontSize: 25, fontWeight: '800' }, track: { height: 8, borderRadius: 9, backgroundColor: '#F6E5E5', marginTop: 18, overflow: 'hidden' }, fill: { height: '100%', borderRadius: 9, backgroundColor: colors.blue }, progressCaption: { color: colors.muted, fontSize: 12, marginTop: 11 }, sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }, sectionHeading: { color: colors.ink, fontSize: 18, fontWeight: '800' }, sectionAction: { color: colors.blue, fontSize: 13, fontWeight: '700' }, todayCard: { padding: 16, borderRadius: 16, backgroundColor: colors.sky, flexDirection: 'row', alignItems: 'center', gap: 13 }, timeBlock: { width: 42, alignItems: 'center' }, time: { color: colors.blue, fontSize: 17, fontWeight: '800' }, meridiem: { color: colors.blue, fontSize: 10, fontWeight: '700' }, todayInfo: { flex: 1 }, className: { color: colors.ink, fontSize: 14, fontWeight: '800' }, teacher: { color: colors.muted, fontSize: 12, marginTop: 4 }, join: { color: colors.blue, fontWeight: '800', fontSize: 13 }, quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, quick: { width: '48%', backgroundColor: colors.white, padding: 15, borderRadius: 14, borderWidth: 1, borderColor: '#F1E4E4', gap: 10 }, quickIcon: { color: colors.blue, fontWeight: '800', fontSize: 21 }, quickLabel: { color: colors.ink, fontSize: 13, fontWeight: '700' }, updateCard: { backgroundColor: colors.white, borderRadius: 14, padding: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F1E4E4', gap: 11 }, noticeDot: { width: 9, height: 9, backgroundColor: '#F5AE32', borderRadius: 5 }, updateText: { flex: 1 }, updateTitle: { color: colors.ink, fontWeight: '700', fontSize: 13 }, updateBody: { color: colors.muted, fontSize: 11, marginTop: 3 }, chevron: { color: colors.muted, fontSize: 25 }, pageIntro: { color: colors.muted, fontSize: 14, lineHeight: 20, marginBottom: 3 }, classCard: { flexDirection: 'row', backgroundColor: colors.white, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#F1E4E4', alignItems: 'center', gap: 12 }, subjectIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, subjectIconText: { color: colors.ink, fontWeight: '800', fontSize: 20 }, classInfo: { flex: 1 }, classSubject: { color: colors.blue, fontWeight: '700', fontSize: 12 }, classTopic: { color: colors.ink, fontWeight: '800', fontSize: 14, marginTop: 2 }, classMeta: { color: colors.muted, fontSize: 11, marginTop: 5 }, classStatus: { fontSize: 9, color: colors.muted, fontWeight: '800' }, statusLive: { color: colors.red }, materialCard: { backgroundColor: colors.white, padding: 14, borderRadius: 15, borderWidth: 1, borderColor: '#F1E4E4', flexDirection: 'row', alignItems: 'center', gap: 12 }, fileIcon: { width: 42, height: 45, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }, fileIconText: { color: colors.ink, fontSize: 10, fontWeight: '800' }, materialInfo: { flex: 1 }, materialTitle: { fontWeight: '800', fontSize: 14, color: colors.ink }, materialMeta: { fontSize: 11, color: colors.muted, marginTop: 5 }, download: { color: colors.blue, fontSize: 22, fontWeight: '700' }, infoBanner: { backgroundColor: '#FFF1D7', padding: 14, borderRadius: 13 }, infoBannerText: { color: colors.amber, fontWeight: '700', fontSize: 13 }, testCard: { backgroundColor: colors.white, padding: 17, borderRadius: 15, borderWidth: 1, borderColor: '#F1E4E4' }, testTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' }, testDetail: { color: colors.muted, fontSize: 12, marginTop: 6 }, testBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }, testStatus: { flex: 1, color: colors.amber, fontSize: 11, fontWeight: '700' }, outlineButton: { borderWidth: 1, borderColor: colors.blue, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 11 }, outlineText: { color: colors.blue, fontSize: 12, fontWeight: '800' }, blueButton: { backgroundColor: colors.blue }, blueText: { color: colors.white }, rankCard: { backgroundColor: colors.navy, padding: 20, borderRadius: 17 }, rankKicker: { color: '#E3B4B4', fontSize: 10, letterSpacing: .8, fontWeight: '700' }, rankNumber: { color: colors.white, fontWeight: '800', fontSize: 30, marginTop: 7 }, rankSuffix: { fontSize: 14, color: '#E8C3C3' }, rankCopy: { color: '#E8C3C3', lineHeight: 18, fontSize: 12, marginTop: 10 }, resultCard: { backgroundColor: colors.white, padding: 16, borderRadius: 15, borderWidth: 1, borderColor: '#F1E4E4' }, resultTop: { flexDirection: 'row', justifyContent: 'space-between' }, resultTitle: { fontWeight: '800', color: colors.ink, fontSize: 14 }, resultPercent: { color: colors.muted, fontSize: 12, marginTop: 5 }, score: { color: colors.ink, fontWeight: '800', fontSize: 14 }, resultTrack: { backgroundColor: '#F6E5E5', height: 7, borderRadius: 10, marginTop: 15, overflow: 'hidden' }, resultFill: { height: '100%', borderRadius: 10 }, classroomBanner: { width: '100%', height: 150, borderRadius: 16 }, contactCard: { backgroundColor: colors.navy, padding: 18, borderRadius: 17, gap: 6 }, contactKicker: { color: '#F5AE32', fontSize: 11, letterSpacing: .8, fontWeight: '800' }, contactAddress: { color: colors.white, fontSize: 13, lineHeight: 19, marginTop: 2 }, contactPhones: { color: '#E8C3C3', fontSize: 13, fontWeight: '700', marginTop: 4 }, contactNote: { color: '#E8C3C3', fontSize: 11, marginTop: 6 }, announcement: { backgroundColor: colors.white, padding: 17, borderRadius: 15, borderWidth: 1, borderColor: '#F1E4E4', gap: 8 }, announceHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, tag: { color: colors.blue, fontWeight: '800', fontSize: 10, letterSpacing: .5 }, date: { color: colors.muted, fontSize: 11 }, announceTitle: { color: colors.ink, fontWeight: '800', fontSize: 16 }, announceBody: { color: colors.muted, fontSize: 13, lineHeight: 19 }, nav: { height: 70, paddingHorizontal: 14, backgroundColor: colors.white, borderTopWidth: 1, borderColor: colors.line, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, navItem: { alignItems: 'center', gap: 4, minWidth: 55 }, navIcon: { color: '#A98787', fontSize: 18, fontWeight: '800' }, navLabel: { color: '#A98787', fontSize: 10, fontWeight: '700' }, navActive: { color: colors.blue }
});

export default App;
