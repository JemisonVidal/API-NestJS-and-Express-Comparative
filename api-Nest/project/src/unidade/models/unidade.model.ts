export class UnidadeModel {
    public uni_tab_in_codigo: number = 0;
    public uni_pad_in_codigo: number = 0;
    public uni_st_unidade: string = '';
    public uni_st_nome: string = '';
    public unf_in_codigo: number = 0;
    public pun_in_decimaisqtde: number = 0;
    public pun_in_decimaisvalor: number = 0;
    public uni_st_calcsegundo: string = '';
}
/*import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Photo {
    @PrimaryColumn()
    uni_tab_in_codigo: number;

    @Column({ length: 500 })
    uni_pad_in_codigo: number;

    @Column('text')
    uni_st_unidade: string;

    @Column()
    uni_st_nome: string;

    @Column('int')
    unf_in_codigo: number;

    @Column()
    pun_in_decimaisqtde: number;

    @Column()
    pun_in_decimaisvalor: number;

    @Column()
    uni_st_calcsegundo: string;
}*/