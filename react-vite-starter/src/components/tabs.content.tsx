import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import UsersTable from './users.table';

function TabsContent() {
    return (
        <Container>
            <Tabs
                defaultActiveKey="users"
                id="uncontrolled-tab-example"
                className="mb-3 mt-3"
            >
                <Tab eventKey="users" title="User">
                    <UsersTable />
                </Tab>
                <Tab eventKey="blogs" title="Blogs">
                    Tab content for Profile
                </Tab>

            </Tabs>
        </Container>
    );
}

export default TabsContent;