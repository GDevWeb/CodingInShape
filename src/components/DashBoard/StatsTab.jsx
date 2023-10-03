import "react";
import './StatsTab.scss'

export default function StatsTab(props) {
  const { usersData } = props;

  const totalUsers = usersData.length;
  const adminCount = usersData.filter((user) => user.isAdmin).length;
  const simpleUserCount = totalUsers - adminCount;
  const bannedCount = usersData.filter((user) => user.isBan).length;

  return (
    <div className="statsContainer">
      <table>
        <thead>
          <tr>
            <th>Total utilisateurs</th>
            <th>Nombre d'utilisateurs</th>
            <th>Nombre d'administrateurs</th>
            <th>Nombre d'utilisateurs bannis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalUsers}</td>
            <td>{simpleUserCount}</td>
            <td>{adminCount}</td>
            <td>{bannedCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
