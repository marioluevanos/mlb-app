export function avatar(id: string | number) {
  return `https://midfield.mlbstatic.com/v1/people/${id}/spots/64`;
}

export function logo(teamId: string | number) {
  return `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/64`;
}
