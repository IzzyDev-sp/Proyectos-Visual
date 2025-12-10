package Java;

import java.util.Random;

public class WarhammerCombatSimulator {
    static final int ATTACKS = 40;
    static final int HIT_TARGET = 3;        // Impacta a 3+
    static final int WOUND_TARGET = 5;      // Hiere a 5+
    static final int SAVE_INVULN = 5;       // Invulnerable a 5+
    static final int DAMAGE = 1;

    public static void main(String[] args) {
        int simulations = 100000; // Número de simulaciones para obtener un promedio estable
        double totalDamage = 0;

        for (int i = 0; i < simulations; i++) {
            totalDamage += simulateCombat();
        }

        double averageDamage = totalDamage / simulations;
        System.out.printf("Daño promedio infligido: %.2f%n", averageDamage);
    }

    static int simulateCombat() {
        Random rand = new Random();
        int totalHits = 0;

        // 1. Fase de impacto
        for (int i = 0; i < ATTACKS; i++) {
            int roll = rollWithReroll1(rand);
            if (roll >= HIT_TARGET) {
                totalHits++;
                if (roll == 6) totalHits++; // Explosión de 6s
            }
        }

        // 2. Fase de heridas
        int totalWounds = 0;
        for (int i = 0; i < totalHits; i++) {
            int roll = rand.nextInt(6) + 1;
            if (roll >= WOUND_TARGET) {
                totalWounds++;
            } else {
                // Repetir tirada para herir
                int reroll = rand.nextInt(6) + 1;
                if (reroll >= WOUND_TARGET) totalWounds++;
            }
        }

        // 3. Tiradas de salvación invulnerable
        int failedSaves = 0;
        for (int i = 0; i < totalWounds; i++) {
            int save = rand.nextInt(6) + 1;
            if (save < SAVE_INVULN) failedSaves++;
        }

        // 4. Calcular daño
        return failedSaves * DAMAGE;
    }

    static int rollWithReroll1(Random rand) {
        int roll = rand.nextInt(6) + 1;
        if (roll == 1) {
            roll = rand.nextInt(6) + 1; // reroll de 1s
        }
        return roll;
    }
}