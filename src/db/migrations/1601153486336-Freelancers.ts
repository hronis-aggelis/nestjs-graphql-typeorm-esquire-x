import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Freelancers1601153486336 implements MigrationInterface {
  private freelancerTable = new Table({
    name: 'freelancers',
    columns: [
      {
        name: 'freelancerId',
        type: 'varchar',
        length: '255',
        isPrimary: true,
        isGenerated: false,
        generationStrategy: 'increment',
      },
      {
        name: 'freelancerAvailability',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'freelancerExperienceLevel',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'slug',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'freelancerHourlyRate',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'createdDate',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'modifiedDate',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'freelancerSkills',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isArray: true,
      },
      {
        name: 'categories',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isArray: true,
      },
      {
        name: 'userUserId2',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      },
      {
        name: 'userUserId',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    columnNames: ['userUserId2'],
    referencedColumnNames: ['userId'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    referencedTableName: 'users',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.freelancerTable);
    await queryRunner.createForeignKey('freelancers', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.freelancerTable);
  }
}
