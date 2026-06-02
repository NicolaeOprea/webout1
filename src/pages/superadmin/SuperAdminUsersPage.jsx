import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../../components/admin/AlertMessage";
import DataTable from "../../components/admin/DataTable";
import PageIntro from "../../components/admin/PageIntro";
import StatusBadge from "../../components/admin/StatusBadge";
import { getBusinessUsers } from "../../api/adminApi";
import { extractApiList } from "../../utils/apiData";
import { getApiErrorMessage } from "../../utils/apiError";
import { formatDateTime } from "../../utils/date";

function SuperAdminUsersPage() {
  const { businessId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(Boolean(businessId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!businessId) return;

    async function loadUsers() {
      setLoading(true);
      setError("");

      try {
        const body = await getBusinessUsers(businessId);
        setUsers(extractApiList(body));
      } catch (caughtError) {
        setError(getApiErrorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [businessId]);

  if (!businessId) {
    return <div className="space-y-6"><PageIntro eyebrow="Users" title="Admin Users" description="Alege un business din lista de Businesses pentru a vedea userii lui." action={<Link className="btn-primary" to="/superadmin/businesses">Businesses</Link>} /><div className="rounded-[1.5rem] border border-stone/10 bg-white p-6 text-stone-light">Userii sunt listați per business prin endpointul Center <code>/api/businesses/:businessId/users</code>.</div></div>;
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (row) => <StatusBadge status={row.role || "business_admin"} /> },
    { key: "createdAt", label: "Created", render: (row) => formatDateTime(row.createdAt) }
  ];

  return <div className="space-y-6"><PageIntro eyebrow="Business Users" title="Admin Accounts" description="Business Admin Accounts für diesen Tenant." action={<Link className="btn-secondary" to="/superadmin/businesses">Zurück</Link>} /><AlertMessage type="error">{error}</AlertMessage><DataTable columns={columns} rows={users} loading={loading} emptyTitle="Keine User" emptyDescription="Für diesen Business gibt es noch keine Admin Accounts." /></div>;
}

export default SuperAdminUsersPage;
