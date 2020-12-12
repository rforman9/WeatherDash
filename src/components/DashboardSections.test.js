import SectionList from './DashboardSections';

const Dashboard = SectionList.makeTempSections()

console.log('Dashboard.sections = ', Dashboard.sections)

test('number of sections = 4', () => {
  expect(Dashboard.sections.length).toBe(4);
});
