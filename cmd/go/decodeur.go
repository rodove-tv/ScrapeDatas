package main

func decod(mdp []string, nb_toure int) {
	mdp_a_trouver := creation_tabel("1Jda_s3ad")

	for i := 0; i <= 2; {
		for j := 33; j <= 122; j++ {
			mdp[nb_toure] = string(j)
			print(mdp)
			if compare_tableau(mdp, mdp_a_trouver) {
				print(mdp)
				return

			}
		}
	}
}

func creation_tabel(mdp_a_trouver string) []string {
	var mdp_tabel []string
	for i := 0; i < len(mdp_a_trouver); i++ {
		mdp_tabel = append(mdp_tabel, string(mdp_a_trouver[i]))
	}
	return mdp_tabel
}

func compare_tableau(mdp, mdp_a_trouver []string) bool {
	if len(mdp) != len(mdp_a_trouver) {
		return false
	}
	for i, v := range mdp {
		if v != mdp_a_trouver[i] {
			return false
		}
	}
	return true
}
