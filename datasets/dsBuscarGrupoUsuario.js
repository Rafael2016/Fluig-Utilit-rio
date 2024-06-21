/**
 * @Retorna Grupos do Usuários
 * @param {string[]} fields Campos para retornar
 * @param {Constraint[]} constraints Filtros
 * @param {string[]} sortFields Campos para ordenar
 * @autor Rafael Luz
 */
function createDataset(fields, constraints, sortFields) {
    var filtros = [];

    if (constraints != null) {
        for (var i = 0; i < constraints.length; ++i) {
            if (constraints[i].fieldName == "groupId") {
                var usersIds = getUsersIdFromGroupId(constraints[i].initialValue);

                if (!usersIds.length) {
                    continue;
                }

                for (var j = 0; j < usersIds.length; ++j) {
                    filtros.push(DatasetFactory.createConstraint(
                        "colleaguePK.colleagueId",
                        usersIds[j],
                        usersIds[j],
                        ConstraintType.SHOULD
                    ));
                }

                continue;
            } else if (constraints[i].fieldName == "colleagueName") {
                var c = DatasetFactory.createConstraint(
                    "colleagueName",
                    constraints[i].initialValue,
                    constraints[i].finalValue,
                    ConstraintType.MUST
                );
                c.setLikeSearch(true);
                filtros.push(c);

                continue;
            }

            filtros.push(constraints[i]);
        }
    }

    if (sortFields == null) {
        sortFields = ["colleagueName"];
    }

    filtros.push(
        DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST)
    );

    return DatasetFactory.getDataset("colleague", fields, filtros, sortFields);
}

function getUsersIdFromGroupId(groupId) {
    var usersIds = [];
    var dataset = DatasetFactory.getDataset(
        "colleagueGroup",
        ["colleagueGroupPK.colleagueId"],
        [
            DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST)
        ],
        null
    );

    for (var i = 0; i < dataset.rowsCount; ++i) {
        usersIds.push(dataset.getValue(i, "colleagueGroupPK.colleagueId"));
    }

    return usersIds;
}